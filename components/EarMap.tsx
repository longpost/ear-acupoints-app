"use client";

import React from "react";
import type { EarPoint } from "@/lib/earPoints";

type Props = {
  viewBox: string;
  points: EarPoint[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export default function EarMap({ viewBox, points, selectedId, onSelect }: Props) {
  const selected = points.find((p) => p.id === selectedId);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* 底图：耳朵轮廓（稳定显示，不吃 SVG innerHTML/namespace 的坑） */}
      <img
        src="/ear_outline.svg"
        alt="ear outline"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          // 如果你觉得太淡，这里可以加滤镜让它更黑：
          // filter: "contrast(200%) brightness(0%)",
        }}
      />

      {/* 点层：SVG 覆盖 */}
      <svg
        viewBox={viewBox}
        preserveAspectRatio="xMidYMid meet"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
      >
        {points.map((p) => {
          const isSel = p.id === selectedId;
          return (
            <g key={p.id} onClick={() => onSelect(p.id)} style={{ cursor: "pointer" }}>
              {/* 点变小：r=5 */}
              <circle className={isSel ? "point selected" : "point"} cx={p.x} cy={p.y} r={5} />
              {isSel && <circle className="pointRing" cx={p.x} cy={p.y} r={9} />}
              <title>
                {p.zh} / {p.en}
              </title>
            </g>
          );
        })}

        {selected ? (
          <g pointerEvents="none">
            <rect
              x={selected.x + 10}
              y={selected.y - 16}
              width={190}
              height={26}
              rx={8}
              ry={8}
              fill="white"
              opacity={0.92}
            />
            <text x={selected.x + 18} y={selected.y + 2} fontSize="12" fontFamily="Arial" fill="#111827">
              {selected.zh} / {selected.en}
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  );
}

