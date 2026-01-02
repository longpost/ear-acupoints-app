import fs from "node:fs";
import path from "node:path";
import AppClient from "@/components/AppClient";

function normalizeSvg(svgText: string) {
  // 1) 把 <ns0:svg ...> / </ns0:svg> 变成 <svg> / </svg>
  let s = svgText
    .replace(/<\s*([a-z0-9_.-]+:)?svg\b/gi, "<svg")
    .replace(/<\/\s*([a-z0-9_.-]+:)?svg\s*>/gi, "</svg");

  // 2) 把标签名里的前缀去掉：<ns0:path> -> <path>
  s = s.replace(/<\s*\/?\s*[a-z0-9_.-]+:([a-z0-9_.-]+)/gi, (m) => {
    // m looks like "<ns0:path" or "</ns0:path"
    return m.replace(/([a-z0-9_.-]+:)/i, "");
  });

  // 3) 去掉所有带前缀的属性：ns2:label="..." 这类会导致解析失败
  s = s.replace(/\s+[a-z0-9_.-]+:[a-z0-9_.-]+="[^"]*"/gi, "");
  s = s.replace(/\s+[a-z0-9_.-]+:[a-z0-9_.-]+='[^']*'/gi, "");

  // 4) 去掉 inkscape/sodipodi 的无用节点（可选，但更干净）
  s = s.replace(/<namedview[\s\S]*?\/>/gi, "");
  s = s.replace(/<metadata[\s\S]*?<\/metadata>/gi, "");

  return s;
}

function extractSvg(svgText: string): { viewBox: string; inner: string } {
  const m = svgText.match(/<svg[^>]*viewBox="([^"]+)"[^>]*>([\s\S]*?)<\/svg>/i);
  if (!m) return { viewBox: "0 0 744.09 1052.4", inner: "" };
  return { viewBox: m[1], inner: m[2] };
}

export default function Page() {
  const svgPath = path.join(process.cwd(), "public", "ear_outline.svg");
  const raw = fs.readFileSync(svgPath, "utf8");

  const normalized = normalizeSvg(raw);
  const { viewBox, inner } = extractSvg(normalized);

  // 兜底：就算原 SVG 颜色很淡，也强制黑色线条
  const baseInnerSvg = `<g style="stroke:#111;stroke-width:1.25;fill:none;vector-effect:non-scaling-stroke;">${inner}</g>`;

  return <AppClient viewBox={viewBox} baseInnerSvg={baseInnerSvg} />;
}
