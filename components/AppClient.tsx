"use client";

import React, { useMemo, useState } from "react";
import EarMap from "./EarMap";
import { EAR_POINTS } from "@/lib/earPoints";
import type { EarPoint } from "@/lib/earPoints";

type Props = {
  viewBox: string;
};

export default function AppClient({ viewBox }: Props) {
  const points: EarPoint[] = EAR_POINTS;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return points;
    return points.filter((p) => (`${p.zh} ${p.en}`).toLowerCase().includes(s));
  }, [q, points]);

  const selected = useMemo(
    () => points.find((p) => p.id === selectedId) || null,
    [points, selectedId]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "360px 1fr",
        gap: 16,
        alignItems: "start",
        padding: 16,
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* 左侧列表 */}
      <aside
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 12,
          background: "white",
        }}
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索耳穴 / Search"
          style={{
            width: "100%",
            padding: "10px 12px",
            marginBottom: 12,
            borderRadius: 10,
            border: "1px solid #e5e7eb",
          }}
        />

        <div style={{ maxHeight: "70vh", overflow: "auto" }}>
          {filtered.map((p) => {
            const active = p.id === selectedId;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "10px 10px",
                  marginBottom: 8,
                  borderRadius: 10,
                  border: "1px solid #e5e7eb",
                  background: active ? "#111827" : "white",
                  color: active ? "white" : "#111827",
                  cursor: "pointer",
                }}
              >
                <div style={{ fontWeight: 800 }}>{p.zh}</div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>{p.en}</div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* 右侧：图 + 说明 */}
      <section
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 12,
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
          {/* 图 */}
          <div style={{ width: "100%" }}>
            <div style={{ width: "100%", aspectRatio: "3 / 4" }}>
              <EarMap
                viewBox={viewBox}
                points={points}
                selectedId={selectedId}
                onSelect={setSelectedId}
                // ✅ 这里调耳朵大小/位置
                earScale={1.8}
                earTranslateX={0}
                earTranslateY={0}
              />
            </div>

            <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
              提示：点红点或点左侧列表查看对应科普说明。
            </div>
          </div>

          {/* 说明 */}
          <div>
            <div style={{ fontSize: 16, fontWeight: 900, marginBottom: 8 }}>说明</div>

            {selected ? (
              <div style={{ border: "1px solid #e5e7eb", borderRadius: 12, padding: 12 }}>
                <div style={{ fontSize: 18, fontWeight: 900 }}>
                  {selected.zh} / {selected.en}
                </div>

                {/* 下面字段按你 earPoints.ts 里的实际字段显示 */}
                {"systemZh" in selected || "systemEn" in selected ? (
                  <div style={{ marginTop: 6, opacity: 0.8 }}>
                    {(selected as any).systemZh ?? (selected as any).systemEn ?? ""}
                  </div>
                ) : null}

                {"descZh" in selected || "descEn" in selected ? (
                  <div style={{ marginTop: 10, lineHeight: 1.7 }}>
                    {(selected as any).descZh ?? (selected as any).descEn ?? ""}
                  </div>
                ) : null}

                {"notesZh" in selected || "notesEn" in selected ? (
                  <div style={{ marginTop: 10, fontSize: 13, opacity: 0.8, lineHeight: 1.6 }}>
                    {(selected as any).notesZh ?? (selected as any).notesEn ?? ""}
                  </div>
                ) : null}
              </div>
            ) : (
              <div
                style={{
                  border: "1px dashed #e5e7eb",
                  borderRadius: 12,
                  padding: 12,
                  opacity: 0.75,
                  lineHeight: 1.7,
                }}
              >
                请选择一个耳穴（点红点或点左侧列表）。
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx global>{`
        .point {
          fill: #ef4444;
          cursor: pointer;
          opacity: 0.95;
        }
        .point.selected {
          fill: #0ea5e9;
        }
        .pointRing {
          fill: none;
          stroke: #0ea5e9;
          stroke-width: 2.5;
          pointer-events: none;
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}
