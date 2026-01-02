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
  const selected = points.find(p => p.id === selectedId);

  return (
    <svg viewBox={viewBox} role="img" aria-label="Auricular acupoints map (educational)">
      <g dangerouslySetInnerHTML={{ __html: baseInnerSvg }} />
      {points.map((p) => {
        const isSel = p.id === selectedId;
        return (
          <g key={p.id} onClick={() => onSelect(p.id)}>
            <circle className={isSel ? "point selected" : "point"} cx={p.x} cy={p.y} r={10} />
            {isSel && <circle className="pointRing" cx={p.x} cy={p.y} r={16} />}
            <title>{p.zh} / {p.en}</title>
          </g>
        );
      })}

      {/* If selected, draw a subtle label near it */}
      {selected ? (
        <g>
          <rect x={selected.x + 14} y={selected.y - 22} width={210} height={34} rx={8} ry={8} fill="white" opacity={0.9} />
          <text x={selected.x + 22} y={selected.y + 1} fontSize="14" fontFamily="Arial" fill="#111827">
            {selected.zh} / {selected.en}
          </text>
        </g>
      ) : null}
    </svg>
  );
}
