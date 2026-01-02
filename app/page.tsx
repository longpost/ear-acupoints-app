import fs from "node:fs";
import path from "node:path";
import AppClient from "@/components/AppClient";

function extractSvg(svgText: string): { viewBox: string; inner: string } {
  const viewBoxMatch = svgText.match(/viewBox="([^"]+)"/i);
  const viewBox = viewBoxMatch?.[1] ?? "0 0 744.09 1052.4";

  // Grab content between the first closing '>' of <svg ...> and </svg>
  const start = svgText.indexOf(">"); // first >
  const end = svgText.lastIndexOf("</svg>");
  const inner = start !== -1 && end !== -1 ? svgText.slice(start + 1, end) : svgText;

  return { viewBox, inner };
}

export default function Page() {
  const svgPath = path.join(process.cwd(), "public", "ear_outline.svg");
  const svgText = fs.readFileSync(svgPath, "utf8");
  const { viewBox, inner } = extractSvg(svgText);

  return <AppClient viewBox={viewBox} baseInnerSvg={inner} />;
}
