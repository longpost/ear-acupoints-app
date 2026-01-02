// app/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import EarMap from "@/components/EarMap";
import { EAR_POINTS } from "@/lib/earPoints";
import type { EarPoint } from "@/lib/earPoints";

function extractSvg(svgText: string): { viewBox: string; inner: string } {
  // 1) Fast path: regex
  const m = svgText.match(/<svg[^>]*viewBox="([^"]+)"[^>]*>([\s\S]*?)<\/svg>/i);
  if (m) return { viewBox: m[1], inner: m[2] };

  // 2) Fallback: DOMParser
  try {
    const doc = new DOMParser().parseFromString(svgText, "image/svg+xml");
    const svg = doc.querySelector("svg");
    if (!svg) return { viewBox: "0 0 800 1200", inner: "" };
    const vb = svg.getAttribute("viewBox") || "0 0 800 1200";
    return { viewBox: vb, inner: svg.innerHTML || "" };
  } catch {
    return { viewBox: "0 0 800 1200", inner: "" };
  }
}

export default function Page() {
  const points: EarPoint[] = EAR_POINTS;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [lang, setLang] = useState<"zh" | "en">("zh");

  const [viewBox, setViewBox] = useState("0 0 800 1200");
  const [baseInnerSvg, setBaseInnerSvg] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        // ear_outline.svg MUST be in /public
        const res = await fetch("/ear_outline.svg", { cache: "force-cache" });
        if (!res.ok) throw new Error(`Failed to load /ear_outline.svg: ${res.status}`);
        const text = await res.text();

        const { viewBox, inner } = extractSvg(text);

        // Make sure the outline is visible even if the SVG has faint/no stroke
        const visibleInner = `
          <g style="stroke:#111827;stroke-width:1.2;fill:none;vector-effect:non-scaling-stroke;">
            ${inner}
          </g>
        `.trim();

        if (!cancelled) {
          setViewBox(viewBox);
          setBaseInnerSvg(visibleInner);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setViewBox("0 0 800 1200");
          setBaseInnerSvg("");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return points;
    return points.filter((p) => {
      const hay = `${p.zh} ${p.en} ${p.categoryZh ?? ""} ${p.categoryEn ?? ""}`.toLowerCase();
      return hay.includes(s);
    });
  }, [q, points]);

  const selected = useMemo(
    () => points.find((p) => p.id === selectedId) || null,
    [points, selectedId]
  );

  return (
    <main style={{ maxWidth: 1200, margin: "0 auto", padding: 16 }}>
      <header style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <h1 style={{ fontSize: 20, fontWeight: 900, margin: 0 }}>Ear Acupoints (Educational)</h1>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button
            onClick={() => setLang("zh")}
            style={{
              padding: "6px 10px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: lang === "zh" ? "#111827" : "white",
              color: lang === "zh" ? "white" : "#111827",
              cursor: "pointer",
            }}
          >
            中文
          </button>
          <button
            onClick={() => setLang("en")}
            style={{
              padding: "6px 10px",
              borderRadius: 10,
              border: "1px solid #e5e7eb",
              background: lang === "en" ? "#111827" : "white",
              color: lang === "en" ? "white" : "#111827",
              cursor: "pointer",
            }}
          >
            English
          </button>
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "360px 1fr",
          gap: 14,
          alignItems: "start",
        }}
      >
        {/* Left panel */}
        <aside
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            padding: 12,
            background: "white",
          }}
        >
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={lang === "zh" ? "搜索穴位…" : "Search points…"}
              style={{
                flex: 1,
                padding: "10px 10px",
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                outline: "none",
              }}
            />
            <button
              onClick={() => {
                setQ("");
                setSelectedId(null);
              }}
              style={{
                padding: "10px 10px",
                borderRadius: 12,
                border: "1px solid #e5e7eb",
                background: "white",
                cursor: "pointer",
              }}
            >
              {lang === "zh" ? "清空" : "Clear"}
            </button>
          </div>

          <div style={{ maxHeight: "70vh", overflow: "auto", paddingRight: 4 }}>
            {filtered.map((p) => {
              const isSel = p.id === selectedId;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 10px",
                    borderRadius: 12,
                    border: "1px solid #e5e7eb",
                    marginBottom: 8,
                    background: isSel ? "#111827" : "white",
                    color: isSel ? "white" : "#111827",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ fontWeight: 800 }}>
                    {lang === "zh" ? p.zh : p.en}
                  </div>
                  <div style={{ fontSize: 12, opacity: isSel ? 0.9 : 0.7, marginTop: 2 }}>
                    {lang === "zh"
                      ? (p.categoryZh ?? "分类")
                      : (p.categoryEn ?? "Category")}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Main panel */}
        <section
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: 14,
            padding: 12,
            background: "white",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(360px, 520px) 1fr",
              gap: 14,
              alignItems: "start",
            }}
          >
            <div style={{ width: "100%" }}>
              <div style={{ width: "100%", aspectRatio: "3 / 4" }}>
                <EarMap
                  viewBox={viewBox}
                  baseInnerSvg={baseInnerSvg}
                  points={points}
                  selectedId={selectedId}
                  onSelect={(id) => setSelectedId(id)}
                />
              </div>
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
                {lang === "zh"
                  ? "提示：点击红点或左侧列表查看对应脏腑/系统说明（科普用途）。"
                  : "Tip: Click a point (or list item) to view its educational description."}
              </div>
              {baseInnerSvg.length === 0 ? (
                <div style={{ marginTop: 8, fontSize: 12, color: "#b91c1c" }}>
                  {lang === "zh"
                    ? "耳朵底图没有加载出来：请确认 public/ear_outline.svg 存在且能直接访问。"
                    : "Base ear SVG not loaded: confirm public/ear_outline.svg exists and is accessible."}
                </div>
              ) : null}
            </div>

            <div>
              <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 8 }}>
                {lang === "zh" ? "说明" : "Details"}
              </div>

              {selected ? (
                <div
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 14,
                    padding: 12,
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 900 }}>
                    {selected.zh} / {selected.en}
                  </div>
                  <div style={{ marginTop: 6, opacity: 0.8 }}>
                    {lang === "zh" ? selected.systemZh : selected.systemEn}
                  </div>
                  <div style={{ marginTop: 10, lineHeight: 1.7 }}>
                    {lang === "zh" ? selected.descZh : selected.descEn}
                  </div>
                  {selected.notesZh || selected.notesEn ? (
                    <div style={{ marginTop: 10, fontSize: 13, opacity: 0.8, lineHeight: 1.6 }}>
                      {lang === "zh" ? selected.notesZh : selected.notesEn}
                    </div>
                  ) : null}
                </div>
              ) : (
                <div
                  style={{
                    border: "1px dashed #e5e7eb",
                    borderRadius: 14,
                    padding: 12,
                    opacity: 0.75,
                    lineHeight: 1.7,
                  }}
                >
                  {lang === "zh"
                    ? "请选择一个耳穴（点红点或点左侧列表）。"
                    : "Select an acupoint (click a red dot or the left list)."}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      <style jsx global>{`
        /* Points styling (matches your EarMap classes) */
        .point {
          fill: #ef4444;
          opacity: 0.95;
          cursor: pointer;
        }
        .point.selected {
          fill: #0ea5e9;
        }
        .pointRing {
          fill: none;
          stroke: #0ea5e9;
          stroke-width: 3;
          opacity: 0.9;
          pointer-events: none;
        }

        svg[role="img"] {
          width: 100%;
          height: 100%;
          display: block;
        }
      `}</style>
    </main>
  );
}

