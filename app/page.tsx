// app/page.tsx (SERVER COMPONENT)
import fs from "fs";
import path from "path";
import AppClient from "@/components/AppClient";

function extractSvg(svgText: string): { viewBox: string; inner: string } {
  // match outer <svg ... viewBox="..." ...> ... </svg>
  const m = svgText.match(/<svg[^>]*viewBox="([^"]+)"[^>]*>([\s\S]*?)<\/svg>/i);
  if (!m) return { viewBox: "0 0 800 1200", inner: "" };
  return { viewBox: m[1], inner: m[2] };
}

export default function Page() {
  const svgPath = path.join(process.cwd(), "public", "ear_outline.svg");
  const svgText = fs.readFileSync(svgPath, "utf8");
  const { viewBox, inner } = extractSvg(svgText);

  // 强制让底图可见（黑色线条、无填充）
  const baseInnerSvg =
    `<g style="stroke:#111827;stroke-width:1.25;fill:none;vector-effect:non-scaling-stroke;">` +
    inner +
    `</g>`;

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: 16 }}>
      <h1 style={{ margin: "0 0 12px 0", fontSize: 20, fontWeight: 900 }}>
        Ear Acupoints (Educational)
      </h1>

      <AppClient viewBox={viewBox} baseInnerSvg={baseInnerSvg} />
    </main>
  );
}
