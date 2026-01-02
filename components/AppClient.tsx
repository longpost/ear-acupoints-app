"use client";

import React, { useMemo, useState } from "react";
import EarMap from "@/components/EarMap"; // ✅ 关键修复：default import
import { EAR_POINTS } from "@/lib/earPoints";
import type { EarPoint } from "@/lib/earPoints";

type Props = {
  viewBox: string;
  baseInnerSvg: string;
};

export default function AppClient({ viewBox, baseInnerSvg }: Props) {
  const points: EarPoint[] = EAR_POINTS;

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim();
    if (!s) return points;
    return points.filter(
      (p) =>
        p.zh.includes(s) ||
        p.en.toLowerCase().includes(s.toLowerCase())
    );
  }, [q, points]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "360px 1fr",
        gap: 16,
        alignItems: "start",
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

      {/* 右侧耳朵图 */}
      <section
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          padding: 12,
          background: "white",
        }}
      >
        <div style={{ width: "100%", aspectRatio: "3 / 4" }}>
          <EarMap
            viewBox={viewBox}
            baseInnerSvg={baseInnerSvg}
            points={points}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
      </section>

      <style jsx global>{`
        .point {
          fill: #ef4444;
          cursor: pointer;
        }
        .point.selected {
          fill: #0ea5e9;
        }
        .pointRing {
          fill: none;
          stroke: #0ea5e9;
          stroke-width: 3;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
