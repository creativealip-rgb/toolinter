import fs from "node:fs";
import path from "node:path";

const faqSrc = fs.readFileSync("src/lib/tool-faq.ts", "utf8");
const paths = [...faqSrc.matchAll(/^\s{2}"(\/[^"]+)":\s*\[/gm)].map((m) => m[1]);
console.log("Tool paths with FAQ data:", paths.length);

const appDir = "src/app";
let updated = 0;

for (const route of paths) {
  const layoutPath = path.join(appDir, route.slice(1), "layout.tsx");
  if (!fs.existsSync(layoutPath)) {
    console.log("SKIP (no layout):", route);
    continue;
  }
  let c = fs.readFileSync(layoutPath, "utf8");
  if (c.includes("ToolFaq")) {
    console.log("SKIP (already has ToolFaq):", route);
    continue;
  }
  // Add import after related-tools import (or after seo import).
  if (c.includes('import RelatedTools from "@/components/related-tools";')) {
    c = c.replace(
      'import RelatedTools from "@/components/related-tools";',
      'import RelatedTools from "@/components/related-tools";\nimport ToolFaq from "@/components/tool-faq";'
    );
  } else {
    // wrap-layout without RelatedTools import shouldn't happen (all FAQ routes have related), but guard:
    c = 'import ToolFaq from "@/components/tool-faq";\n' + c;
  }
  // Insert ToolFaq before RelatedTools in the render.
  c = c.replace(
    /<RelatedTools toolPath=\{("[^"]+")\} \/>/,
    `<ToolFaq toolPath={$1} />\n        <RelatedTools toolPath={$1} />`
  );
  fs.writeFileSync(layoutPath, c, "utf8");
  updated++;
  console.log("UPDATED:", route);
}
console.log("\nTotal updated:", updated);
