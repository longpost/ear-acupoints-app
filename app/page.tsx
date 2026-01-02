import fs from "node:fs";
import path from "node:path";
import AppClient from "@/components/AppClient";

function extractSvg(svgText: string): { viewBox: string; inner: string } {
  // 1) viewBox
  const viewBoxMatch = svgText.match(/viewBox="([^"]+)"/i);
  const viewBox = viewBoxMatch?.[1] ?? "0 0 744.09 1052.4";

  // 2) find the end of the opening tag
  const start = svgText.indexOf(">"); // first '>' after <ns0:svg ...>
  // 3) find the closing tag for *any* namespaced svg, e.g. </svg> or </ns0:svg>
  const end = svgText.search(/<\/[a-z0-9_.:-]*svg>\s*$/i);

  const inner =
    start !== -1 && end !== -1 && end > start
      ? svgText.slice(start + 1, end)
      : svgText;

  return { viewBox, inner };
}

export default function Page() {
  const svgPath = path.join(process.cwd(), "public", "ear_outline.svg");
  const svgText = fs.readFileSync(svgPath, "utf8");
  const { viewBox, inner } = extractSvg(svgText);

  return <AppClient viewBox={viewBox} baseInnerSvg={inner} />;
}
