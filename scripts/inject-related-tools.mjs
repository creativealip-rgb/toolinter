import fs from "node:fs";
import path from "node:path";

// Read the paths we have related-tools data for.
const relSrc = fs.readFileSync("src/lib/related-tools.ts", "utf8");
const paths = [...relSrc.matchAll(/^\s{2}"(\/[^"]+)":\s*\[/gm)].map((m) => m[1]);
console.log("Tool paths with related data:", paths.length);

const appDir = "src/app";
let updated = 0;
let createdWrap = 0;

// Metadata for client-component routes (from gen-tool-layouts.mjs) — reuse if we must recreate.
for (const route of paths) {
  const dir = path.join(appDir, route.slice(1));
  const layoutPath = path.join(dir, "layout.tsx");
  const wrapPath = path.join(dir, "related-wrap.tsx"); // not used; inline instead

  if (fs.existsSync(layoutPath)) {
    // Modify existing layout (the 19 client routes) to render RelatedTools after children.
    let c = fs.readFileSync(layoutPath, "utf8");
    if (c.includes("RelatedTools")) {
      console.log("SKIP (already has RelatedTools):", route);
      continue;
    }
    // Add import
    if (!c.includes('from "@/components/related-tools"')) {
      c = c.replace(
        /import { generateToolMetadata } from "@\/lib\/seo";/,
        'import { generateToolMetadata } from "@/lib/seo";\nimport RelatedTools from "@/components/related-tools";'
      );
    }
    // Replace the default export body to wrap children + RelatedTools
    c = c.replace(
      /export default function Layout\(\{ children \}: \{ children: React\.ReactNode \}\) \{\s*return children;\s*\}/,
      `export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <RelatedTools toolPath=${JSON.stringify(route)} />
      </div>
    </>
  );
}`
    );
    fs.writeFileSync(layoutPath, c, "utf8");
    updated++;
    console.log("UPDATED layout:", route);
  } else {
    // Server-component page route: create a layout WITHOUT metadata (page already has it)
    // that renders children + RelatedTools.
    if (!fs.existsSync(dir)) {
      console.log("SKIP (no dir):", route);
      continue;
    }
    const content = `import RelatedTools from "@/components/related-tools";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="mx-auto w-full max-w-3xl px-4 pb-12">
        <RelatedTools toolPath=${JSON.stringify(route)} />
      </div>
    </>
  );
}
`;
    fs.writeFileSync(layoutPath, content, "utf8");
    createdWrap++;
    console.log("CREATED wrap-layout:", route);
  }
}

console.log(`\nUpdated existing layouts: ${updated}`);
console.log(`Created new wrap-layouts: ${createdWrap}`);
