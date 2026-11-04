// 網站文案與資料集中在這裡，之後要改字或換照片只需修改此檔。
// 照片目前為 Unsplash 示意圖，正式上線前請替換成品牌實拍照片。

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2400&q=80`;

export const images = {
  hero: unsplash("1506905925346-21bda4d32df4"),
  story: unsplash("1442512595331-e89e73853f31"),
  quote: unsplash("1524350876685-274059332603"),
  visit: unsplash("1495474472287-4d71bcdd2085"),
};

export const navLinks = [
  { href: "#story", label: "品牌故事" },
  { href: "#origins", label: "產區" },
  { href: "#flavor", label: "風味輪" },
  { href: "#beans", label: "本季豆單" },
  { href: "#visit", label: "門市" },
];

export type Origin = {
  id: string;
  name: string;
  en: string;
  region: string;
  altitude: string;
  variety: string;
  process: string;
  description: string;
  image: string;
};

export const origins: Origin[] = [
  {
    id: "alishan",
    name: "阿里山",
    en: "Alishan",
    region: "嘉義縣 阿里山鄉",
    altitude: "1,200 – 1,400 m",
    variety: "藝伎 · 鐵比卡",
    process: "日曬 / 水洗",
    description:
      "終年雲霧繚繞，日夜溫差大，咖啡櫻桃在山嵐裡慢慢熟成，帶出明亮的花香與蜂蜜般的甜。",
    image: unsplash("1470071459604-3b5ec3a7fe05"),
  },
  {
    id: "huisun",
    name: "南投 惠蓀",
    en: "Huisun, Nantou",
    region: "南投縣 仁愛鄉",
    altitude: "800 – 1,000 m",
    variety: "鐵比卡 · 波旁",
    process: "水洗",
    description:
      "在林蔭下半遮蔭種植，風味乾淨透亮。柑橘般的酸質過後，是像高山烏龍一樣的回甘。",
    image: unsplash("1441974231531-c6227db76b6e"),
  },
  {
    id: "dawu",
    name: "屏東 大武山",
    en: "Dawu Mountain, Pingtung",
    region: "屏東縣 泰武鄉",
    altitude: "700 – 900 m",
    variety: "鐵比卡",
    process: "蜜處理",
    description:
      "南國的陽光與山林的濕潤，讓豆子帶著飽滿的堅果、焦糖甜感，尾韻有淡淡的可可。",
    image: unsplash("1500382017468-9049fed747ef"),
  },
];

export type FlavorCategory = {
  key: string;
  name: string;
  en: string;
  color: string;
  notes: string[];
  description: string;
  beans: string[];
};

export const flavorCategories: FlavorCategory[] = [
  {
    key: "floral",
    name: "花香",
    en: "Floral",
    color: "#d9a79c",
    notes: ["茉莉", "橙花", "玫瑰"],
    description: "高海拔與慢熟成帶來的細緻香氣，入口前就能聞到，像清晨山間的花。",
    beans: ["阿里山 日曬藝伎"],
  },
  {
    key: "fruity",
    name: "果香",
    en: "Fruity",
    color: "#d8865c",
    notes: ["柑橘", "莓果", "蜜桃", "熱帶水果"],
    description: "明亮多汁的酸質，是淺焙台灣豆最迷人的地方，溫度降下來會更甜。",
    beans: ["阿里山 日曬藝伎", "南投惠蓀 水洗"],
  },
  {
    key: "sweet",
    name: "甜感",
    en: "Sweet",
    color: "#dcb46c",
    notes: ["蜂蜜", "黑糖", "焦糖"],
    description: "來自咖啡櫻桃本身的糖分，處理法與烘焙曲線會決定它是蜜甜還是焦糖甜。",
    beans: ["屏東大武山 蜜處理", "南投惠蓀 水洗"],
  },
  {
    key: "nutty",
    name: "堅果可可",
    en: "Nutty & Cocoa",
    color: "#a0755a",
    notes: ["杏仁", "榛果", "可可", "黑巧克力"],
    description: "圓潤厚實的口感，適合加奶，也是我們招牌配方的骨架。",
    beans: ["屏東大武山 蜜處理", "山嵐 招牌配方"],
  },
  {
    key: "spice",
    name: "香料",
    en: "Spice",
    color: "#b0573b",
    notes: ["肉桂", "丁香"],
    description: "中深焙時浮現的溫暖辛香，冬天喝起來特別有層次。",
    beans: ["山嵐 招牌配方"],
  },
  {
    key: "tea",
    name: "茶感",
    en: "Tea & Herbal",
    color: "#6f8b6a",
    notes: ["烏龍", "紅茶", "草本"],
    description: "台灣咖啡獨有的印記：清爽的茶韻與回甘，和這片土地的茶文化一脈相承。",
    beans: ["南投惠蓀 水洗", "阿里山 日曬藝伎"],
  },
];

export type Bean = {
  name: string;
  origin: string;
  process: string;
  roast: number; // 1 淺 – 5 深
  roastLabel: string;
  notes: string[];
  price: string;
  tone: string;
};

export const beans: Bean[] = [
  {
    name: "阿里山 日曬藝伎",
    origin: "嘉義 阿里山",
    process: "日曬",
    roast: 1,
    roastLabel: "淺焙",
    notes: ["茉莉", "蜜桃", "蜂蜜"],
    price: "NT$ 880 / 100g",
    tone: "#d9a79c",
  },
  {
    name: "南投惠蓀 水洗",
    origin: "南投 惠蓀",
    process: "水洗",
    roast: 2,
    roastLabel: "中淺焙",
    notes: ["柑橘", "烏龍茶", "黑糖"],
    price: "NT$ 620 / 200g",
    tone: "#6f8b6a",
  },
  {
    name: "屏東大武山 蜜處理",
    origin: "屏東 大武山",
    process: "蜜處理",
    roast: 3,
    roastLabel: "中焙",
    notes: ["榛果", "焦糖", "可可"],
    price: "NT$ 580 / 200g",
    tone: "#dcb46c",
  },
  {
    name: "山嵐 招牌配方",
    origin: "台灣產區綜合",
    process: "水洗 × 蜜處理",
    roast: 4,
    roastLabel: "中深焙",
    notes: ["黑巧克力", "肉桂", "紅糖"],
    price: "NT$ 480 / 200g",
    tone: "#a0755a",
  },
];

export const steps = [
  {
    title: "走進產區",
    body: "每一季上山拜訪農友，親自走過咖啡園、一起採收，從源頭認識每一支豆子。",
  },
  {
    title: "生豆篩選",
    body: "以手工挑除瑕疵豆，並記錄含水率與密度，作為烘焙曲線的依據。",
  },
  {
    title: "小批次烘焙",
    body: "每爐只烘 3 公斤，依豆子特性微調火力，把產區風味留在最好的位置。",
  },
  {
    title: "杯測後出貨",
    body: "每一批都經過杯測確認，烘焙後 48 小時內寄出，讓你喝到最新鮮的狀態。",
  },
];
