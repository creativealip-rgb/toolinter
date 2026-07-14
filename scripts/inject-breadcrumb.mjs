import fs from "node:fs";
import path from "node:path";

// Collect all tool routes that have a layout with RelatedTools.
const relSrc = fs.readFileSync("src/lib/related-tools.ts", "utf8");
const paths = [...relSrc.matchAll(/^\s{2}"(\/[^"]+)":\s*\[/gm)].map((m) => m[1]);

// Human title: prefer the title inside generateToolMetadata if present, else derive from slug.
function deriveTitle(layoutSrc, route) {
  const m = layoutSrc.match(/title:\s*"([^"]+)"/);
  if (m) return m[1];
  // fallback: last segment prettified
  const seg = route.split("/").filter(Boolean).pop() || "";
  return seg
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

let updated = 0;
for (const route of paths) {
  const layoutPath = path.join("src/app", route.slice(1), "layout.tsx");
  if (!fs.existsSync(layoutPath)) continue;
  let c = fs.readFileSync(layoutPath, "utf8");
  if (c.includes("BreadcrumbJsonLd")) continue;

  const title = deriveTitle(c, route);

  // add import (after related-tools import if present, else after first import line)
  if (c.includes('import RelatedTools from "@/components/related-tools";')) {
    c = c.replace(
      'import RelatedTools from "@/components/related-tools";',
      'import RelatedTools from "@/components/related-tools";\nimport BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";'
    );
  } else {
    c = 'import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld";\n' + c;
  }

  // Insert breadcrumb right after opening fragment <>
  c = c.replace(
    /return \(\s*<>\s*\{children\}/,
    `return (\n    <>\n      <BreadcrumbJsonLd toolPath=${JSON.stringify(route)} title=${JSON.stringify(title)} />\n      {children}`
  );

  fs.writeFileSync(layoutPath, c, "utf8");
  updated++;
  console.log("OK:", route, "→", title);
}
console.log("\nTotal:", updated);
