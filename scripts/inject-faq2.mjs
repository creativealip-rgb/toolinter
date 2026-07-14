import fs from "node:fs";
import path from "node:path";

const faqSrc = fs.readFileSync("src/lib/tool-faq.ts", "utf8");
const paths = [...faqSrc.matchAll(/^\s{2}"(\/[^"]+)":\s*\[/gm)].map((m) => m[1]);

const appDir = "src/app";
let updated = 0;

for (const route of paths) {
  const layoutPath = path.join(appDir, route.slice(1), "layout.tsx");
  if (!fs.existsSync(layoutPath)) continue;
  let c = fs.readFileSync(layoutPath, "utf8");

  // Ensure import present (idempotent).
  if (!c.includes('import ToolFaq from "@/components/tool-faq";')) {
    c = c.replace(
      'import RelatedTools from "@/components/related-tools";',
      'import RelatedTools from "@/components/related-tools";\nimport ToolFaq from "@/components/tool-faq";'
    );
  }

  // Insert <ToolFaq .../> before <RelatedTools .../> if not already there.
  if (!c.includes("<ToolFaq")) {
    // Match both {"..."} and "..." forms.
    const re = /<RelatedTools toolPath=(\{?"[^"]+"\}?) \/>/;
    const m = c.match(re);
    if (m) {
      const prop = m[1];
      c = c.replace(re, `<ToolFaq toolPath=${prop} />\n        <RelatedTools toolPath=${prop} />`);
    }
  }

  fs.writeFileSync(layoutPath, c, "utf8");
  updated++;
  console.log("OK:", route);
}
console.log("\nTotal:", updated);
