"use client";

import React from "react";
import type { EarPoint } from "@/lib/earPoints";

type Props = {
  viewBox: string;
  baseInnerSvg: string; // inner markup (no outer <svg>)
  points: EarPoint[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function EarMap({ viewBox, baseInnerSvg, points, selectedId, onSelect }: Props) {
  const selected = points.find((p) => p.id === selectedId);

  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label="Auricular acupoints map (educational)"
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      {/* Ear outline */}
      <g dangerouslySetInnerHTML={{ __html: baseInnerSvg }} />

      {/* Points (smaller) */}
      {points.map((p) => {
        const isSel = p.id === selectedId;
        return (
          <g key={p.id} onClick={() => onSelect(p.id)} style={{ cursor: "pointer" }}>
            <circle className={isSel ? "point selected" : "point"} cx={p.x} cy={p.y} r={6} />
            {isSel && <circle className="pointRing" cx={p.x} cy={p.y} r={11} />}
            <title>
              {p.zh} / {p.en}
            </title>
          </g>
        );
      })}

      {/* Selected label (smaller, less blocking) */}
      {selected ? (
        <g pointerEvents="none">
          <rect
            x={selected.x + 12}
            y={selected.y - 18}
            width={190}
            height={28}
            rx={8}
            ry={8}
            fill="white"
            opacity={0.92}
          />
          <text x={selected.x + 20} y={selected.y + 2} fontSize="12" fontFamily="Arial" fill="#111827">
            {selected.zh} / {selected.en}
          </text>
        </g>
      ) : null}
    </svg>
  );
}

