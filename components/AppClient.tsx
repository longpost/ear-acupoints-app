"use client";

import React, { useMemo, useState } from "react";
import EarMap from "@/components/EarMap";
import { EAR_POINTS, CATEGORY_LABEL, type Lang, type EarPoint } from "@/lib/earPoints";

type Props = {
  viewBox: string;
  baseInnerSvg: string;
};

const CATS: EarPoint["category"][] = ["Calming","Organs","Endocrine","Spine","HeadFace","Pain"];

export default function AppClient({ viewBox, baseInnerSvg }: Props) {
  const [lang, setLang] = useState<Lang>("zh");
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<EarPoint["category"] | "All">("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const points = EAR_POINTS;

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return points.filter(p => {
      if (cat !== "All" && p.category !== cat) return false;
      if (!query) return true;
      const hay = [
        p.id, p.zh, p.en, p.organZh, p.organEn, p.summaryZh, p.summaryEn
      ].join(" ").toLowerCase();
      return hay.includes(query);
    });
  }, [points, q, cat]);

  const selected = points.find(p => p.id === selectedId) || null;

  const label = (zh: string, en: string) => lang === "zh" ? zh : en;

  const onSelect = (id: string) => setSelectedId(id);

  return (
    <main className="container">
      <div>
        <h1 className="h1">{label("耳穴位科普互动图", "Auricular Acupoints Map (Educational)")}</h1>
        <div className="sub">
          {label(
            "点左侧列表或耳朵上的红点，高亮并显示对应脏腑/功能（科普用途，不用于诊断或治疗）。",
            "Click a list item or a red point to highlight it and see the related organ/function (educational only; not medical advice)."
          )}
        </div>
      </div>

      <div className="grid">
        {/* Left: list */}
        <section className="card">
          <div className="toolbar">
            <button className={"pill " + (lang === "zh" ? "active" : "")} onClick={() => setLang("zh")}>中文</button>
            <button className={"pill " + (lang === "en" ? "active" : "")} onClick={() => setLang("en")}>English</button>
            <input
              className="input"
              placeholder={label("搜索：神门 / Heart / spine ...", "Search: Shenmen / Heart / spine ...")}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button className={"pill " + (cat === "All" ? "active" : "")} onClick={() => setCat("All")}>
                {label("全部", "All")}
              </button>
              {CATS.map(c => (
                <button key={c} className={"pill " + (cat === c ? "active" : "")} onClick={() => setCat(c)}>
                  {label(CATEGORY_LABEL[c].zh, CATEGORY_LABEL[c].en)}
                </button>
              ))}
            </div>
          </div>

          <div className="list">
            {filtered.map(p => {
              const isActive = p.id === selectedId;
              return (
                <div key={p.id} className={"item " + (isActive ? "active" : "")} onClick={() => onSelect(p.id)}>
                  <div className="itemTitle">{label(p.zh, p.en)}</div>
                  <div className="itemMeta">
                    {label(CATEGORY_LABEL[p.category].zh, CATEGORY_LABEL[p.category].en)} · {label(p.organZh, p.organEn)}
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 ? (
              <div style={{ padding: 12, color: "var(--muted)", fontSize: 13 }}>
                {label("没搜到。换个词。", "No results. Try a different keyword.")}
              </div>
            ) : null}
          </div>
        </section>

        {/* Middle: map */}
        <section className="card">
          <div className="mapWrap">
            <EarMap
              viewBox={viewBox}
              baseInnerSvg={baseInnerSvg}
              points={points}
              selectedId={selectedId}
              onSelect={onSelect}
            />
            <div className="legend">
              {label(
                "提示：这个耳朵是“左耳”示意图。不同体系的耳穴位置可能略有差异，这里只做科普互动展示。",
                "Tip: This is a left-ear schematic. Ear maps vary by system/school; this is for educational interaction."
              )}
            </div>
          </div>
        </section>

        {/* Right: info */}
        <section className="card">
          <div className="info">
            {selected ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <span className="badge">{label(CATEGORY_LABEL[selected.category].zh, CATEGORY_LABEL[selected.category].en)}</span>
                  <span className="badge">{label(selected.side === "Both" ? "双侧" : selected.side === "Left" ? "左" : "右", selected.side)}</span>
                </div>

                <h2 style={{ margin: "10px 0 0", fontSize: 18 }}>{label(selected.zh, selected.en)}</h2>

                <div className="kv">
                  <div className="k">{label("对应脏腑/系统", "Related organ/system")}</div>
                  <div className="v">{label(selected.organZh, selected.organEn)}</div>
                </div>

                <div className="kv">
                  <div className="k">{label("科普说明", "Educational note")}</div>
                  <div className="v">{label(selected.summaryZh, selected.summaryEn)}</div>
                </div>

                <div className="kv">
                  <div className="k">{label("怎么用这个图", "How to use this map")}</div>
                  <div className="v">
                    {label(
                      "继续点别的穴位对比。你也可以按你的教材/体系，把坐标和内容改成你要的版本。",
                      "Click other points to compare. You can edit coordinates and descriptions to match your textbook/system."
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2 style={{ margin: 0, fontSize: 18 }}>{label("说明", "Info")}</h2>
                <div className="sub" style={{ marginTop: 8 }}>
                  {label(
                    "先选一个穴位。右侧会显示对应脏腑/功能说明。",
                    "Select a point first. Details will show here."
                  )}
                </div>

                <div className="kv">
                  <div className="k">{label("免责声明", "Disclaimer")}</div>
                  <div className="v">
                    {label(
                      "仅用于科普/教学演示。不要把这个图当成诊断或治疗依据；有症状请就医。",
                      "Educational demo only. Not for diagnosis or treatment decisions; seek professional care if needed."
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
