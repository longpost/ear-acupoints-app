export type Lang = "zh" | "en";

export type EarPoint = {
  id: string;
  zh: string;
  en: string;
  category: "Calming" | "Organs" | "Endocrine" | "Pain" | "HeadFace" | "Spine";
  side: "Left" | "Right" | "Both";
  organZh: string;
  organEn: string;
  summaryZh: string;
  summaryEn: string;
  // coordinates in the SVG viewBox space
  x: number;
  y: number;
};

/**
 * IMPORTANT:
 * - This is an educational visualization for common “auricular point” concepts.
 * - Ear maps differ across systems/schools. Do not use this for diagnosis or treatment decisions.
 */
export const EAR_POINTS: EarPoint[] = [
  {
    id: "shenmen",
    zh: "神门",
    en: "Shenmen",
    category: "Calming",
    side: "Both",
    organZh: "神志 / 情绪调节",
    organEn: "Mind/Emotion regulation",
    summaryZh: "常用于放松、安神、缓解紧张（科普用途）。",
    summaryEn: "Often used in education as a calming/relaxation point.",
    x: 350,
    y: 505
  },
  {
    id: "sympathetic",
    zh: "交感",
    en: "Sympathetic",
    category: "Calming",
    side: "Both",
    organZh: "自主神经 / 交感副交感平衡",
    organEn: "Autonomic nervous system balance",
    summaryZh: "用于科普：调节紧张反应、辅助放松。",
    summaryEn: "Education: related to autonomic balance and relaxation.",
    x: 330,
    y: 560
  },
  {
    id: "subcortex",
    zh: "皮质下",
    en: "Subcortex",
    category: "Calming",
    side: "Both",
    organZh: "大脑功能调节（科普）",
    organEn: "Brain function (educational)",
    summaryZh: "常见耳穴系统中用于“神经调节”的概念点。",
    summaryEn: "A common conceptual point in some auricular maps.",
    x: 300,
    y: 455
  },
  {
    id: "endocrine",
    zh: "内分泌",
    en: "Endocrine",
    category: "Endocrine",
    side: "Both",
    organZh: "内分泌系统",
    organEn: "Endocrine system",
    summaryZh: "科普：与激素/代谢调节相关的概念点。",
    summaryEn: "Education: concept point linked to hormones/metabolism.",
    x: 340,
    y: 640
  },

  // Organs (concha area)
  {
    id: "lung",
    zh: "肺",
    en: "Lung",
    category: "Organs",
    side: "Both",
    organZh: "肺 / 呼吸系统",
    organEn: "Lung / Respiratory",
    summaryZh: "科普：呼吸相关概念点。",
    summaryEn: "Education: respiratory-related concept point.",
    x: 355,
    y: 470
  },
  {
    id: "heart",
    zh: "心",
    en: "Heart",
    category: "Organs",
    side: "Both",
    organZh: "心 / 心血管",
    organEn: "Heart / Cardiovascular",
    summaryZh: "科普：心血管相关概念点。",
    summaryEn: "Education: cardiovascular-related concept point.",
    x: 340,
    y: 495
  },
  {
    id: "stomach",
    zh: "胃",
    en: "Stomach",
    category: "Organs",
    side: "Both",
    organZh: "胃 / 消化",
    organEn: "Stomach / Digestion",
    summaryZh: "科普：消化相关概念点。",
    summaryEn: "Education: digestion-related concept point.",
    x: 385,
    y: 505
  },
  {
    id: "spleen",
    zh: "脾",
    en: "Spleen (TCM)",
    category: "Organs",
    side: "Both",
    organZh: "脾（中医）/ 运化",
    organEn: "Spleen (TCM) / Transformation",
    summaryZh: "科普：常见耳穴系统中的“脾”概念点。",
    summaryEn: "Education: a common point in TCM-style ear maps.",
    x: 395,
    y: 540
  },
  {
    id: "liver",
    zh: "肝",
    en: "Liver",
    category: "Organs",
    side: "Both",
    organZh: "肝 / 代谢与情志（科普）",
    organEn: "Liver / Metabolism & emotion (education)",
    summaryZh: "科普：肝相关概念点。",
    summaryEn: "Education: liver-related concept point.",
    x: 380,
    y: 565
  },
  {
    id: "kidney",
    zh: "肾",
    en: "Kidney",
    category: "Organs",
    side: "Both",
    organZh: "肾 / 泌尿与精气（科普）",
    organEn: "Kidney / Urinary & vitality (education)",
    summaryZh: "科普：肾相关概念点。",
    summaryEn: "Education: kidney-related concept point.",
    x: 365,
    y: 600
  },

  // Spine along antihelix
  {
    id: "cervical",
    zh: "颈椎",
    en: "Cervical Spine",
    category: "Spine",
    side: "Both",
    organZh: "颈段脊柱（科普）",
    organEn: "Cervical spine (education)",
    summaryZh: "科普：耳廓反射系统中“脊柱分段”概念。",
    summaryEn: "Education: segmented spine concept on the ear map.",
    x: 305,
    y: 360
  },
  {
    id: "thoracic",
    zh: "胸椎",
    en: "Thoracic Spine",
    category: "Spine",
    side: "Both",
    organZh: "胸段脊柱（科普）",
    organEn: "Thoracic spine (education)",
    summaryZh: "科普：脊柱分段概念点。",
    summaryEn: "Education: segmented spine concept point.",
    x: 318,
    y: 445
  },
  {
    id: "lumbar",
    zh: "腰椎",
    en: "Lumbar Spine",
    category: "Spine",
    side: "Both",
    organZh: "腰段脊柱（科普）",
    organEn: "Lumbar spine (education)",
    summaryZh: "科普：脊柱分段概念点。",
    summaryEn: "Education: segmented spine concept point.",
    x: 325,
    y: 535
  },
  {
    id: "sciatic",
    zh: "坐骨神经",
    en: "Sciatic Nerve",
    category: "Pain",
    side: "Both",
    organZh: "坐骨神经/下肢放射痛概念（科普）",
    organEn: "Sciatic nerve concept (education)",
    summaryZh: "科普：常见耳穴图里用于下肢放射痛的概念点。",
    summaryEn: "Education: commonly marked for sciatic-type pain concepts.",
    x: 310,
    y: 660
  },

  // Head/Face on lobule (approx)
  {
    id: "eye",
    zh: "眼",
    en: "Eye",
    category: "HeadFace",
    side: "Both",
    organZh: "眼/视觉（科普）",
    organEn: "Eye/vision (education)",
    summaryZh: "科普：眼相关概念点。",
    summaryEn: "Education: eye-related concept point.",
    x: 245,
    y: 760
  },
  {
    id: "nose",
    zh: "鼻",
    en: "Nose",
    category: "HeadFace",
    side: "Both",
    organZh: "鼻/鼻腔（科普）",
    organEn: "Nose (education)",
    summaryZh: "科普：鼻相关概念点。",
    summaryEn: "Education: nose-related concept point.",
    x: 232,
    y: 735
  },
  {
    id: "mouth",
    zh: "口",
    en: "Mouth",
    category: "HeadFace",
    side: "Both",
    organZh: "口腔（科普）",
    organEn: "Mouth (education)",
    summaryZh: "科普：口相关概念点。",
    summaryEn: "Education: mouth-related concept point.",
    x: 220,
    y: 710
  },
  {
    id: "jaw",
    zh: "颌",
    en: "Jaw",
    category: "HeadFace",
    side: "Both",
    organZh: "颌面部（科普）",
    organEn: "Jaw/face (education)",
    summaryZh: "科普：颌面相关概念点。",
    summaryEn: "Education: jaw/face concept point.",
    x: 242,
    y: 690
  },
  {
    id: "occiput",
    zh: "枕",
    en: "Occiput",
    category: "HeadFace",
    side: "Both",
    organZh: "枕部/后头部（科普）",
    organEn: "Occiput/back of head (education)",
    summaryZh: "科普：后头部相关概念点。",
    summaryEn: "Education: back-of-head concept point.",
    x: 235,
    y: 815
  }
];

export const CATEGORY_LABEL: Record<EarPoint["category"], { zh: string; en: string }> = {
  Calming: { zh: "安神/放松", en: "Calming" },
  Organs: { zh: "脏腑", en: "Organs" },
  Endocrine: { zh: "内分泌", en: "Endocrine" },
  Pain: { zh: "疼痛/神经", en: "Pain/Nerve" },
  HeadFace: { zh: "头面", en: "Head/Face" },
  Spine: { zh: "脊柱", en: "Spine" }
};
