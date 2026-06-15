const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const themeColor = document.querySelector('meta[name="theme-color"]');
const languageOptions = document.querySelectorAll(".language-option");
const savedTheme = localStorage.getItem("theme");
const savedLanguage = localStorage.getItem("language");

const translations = {
  "Skip to content": "跳至主要内容",
  Profile: "关于",
  Journey: "经历",
  Work: "项目",
  Contact: "联系",
  "Open to ideas": "期待新想法",
  "I find the": "我从噪声中",
  signal: "寻找信号",
  "in noise.": "创造价值。",
  "Incoming University of Toronto Engineering Science student in Toronto, exploring quantitative research and building tools that turn ideas into measurable value.":
    "即将入读多伦多大学 Engineering Science，现居多伦多。我正在探索量化研究，并通过构建工具，把想法转化为可衡量的价值。",
  "Explore my work": "查看我的项目",
  "Start a conversation": "与我交流",
  "LIVE SIGNAL FIELD": "实时信号场",
  "Move through the field to inspect the signal.": "移动光标，观察信号变化。",
  "U OF T ENGINEERING SCIENCE": "多大 ENGINEERING SCIENCE",
  "QUANTITATIVE RESEARCH": "量化研究",
  "FRONTEND DEVELOPMENT": "前端开发",
  ENTREPRENEURSHIP: "创业实践",
  PROFILE: "关于我",
  "A way of working": "我的思考方式",
  "I am a Toronto high school student preparing to study Engineering Science at U of T. I learn by turning questions into models, products, and experiments.":
    "我是一名来自多伦多的高中生，即将进入多伦多大学 Engineering Science。我习惯把问题转化为模型、产品和实验，并在构建过程中学习。",
  "Quantitative research appeals to me because it demands both imagination and discipline: form a hypothesis, define the assumptions, test it against data, and be honest about what fails.":
    "量化研究吸引我，是因为它同时需要想象力与严谨性：提出假设、明确前提、用数据检验，并诚实面对失败的结果。",
  "I am also interested in creating value independently. Whether I am writing frontend code, testing a market model, or developing a product idea, I want the result to be useful beyond the exercise itself.":
    "我也希望能够独立创造价值。无论是编写前端代码、测试市场模型，还是发展产品创意，我都希望成果不只停留在练习，而能真正产生用途。",
  "OPERATING PRINCIPLES": "行动原则",
  INPUT: "起点",
  "Ask a testable question": "提出可检验的问题",
  PROCESS: "过程",
  "Build and challenge the model": "构建并挑战模型",
  OUTPUT: "结果",
  "Create measurable value": "创造可衡量的价值",
  JOURNEY: "成长路径",
  "Education and experience": "教育与经历",
  "Still early, already building": "仍在起步，已经开始构建",
  "The path so far.": "目前走过的路。",
  EDUCATION: "教育",
  "University of Toronto": "多伦多大学",
  "Incoming Engineering Science student.": "即将入读 Engineering Science。",
  EXPERIENCE: "经历",
  "Frontend Developer · VolunTrack": "前端开发 · VolunTrack",
  "Contributing frontend implementation and interface work as the product develops.":
    "随着产品持续发展，参与前端实现与界面细节的开发。",
  "PRODUCT / WEB": "产品 / 网页",
  "Earl Haig Secondary School": "Earl Haig 中学",
  "Secondary education with a strong focus on mathematics, problem solving, and building.":
    "高中阶段重点投入数学、问题解决与实践构建。",
  DISTINCTIONS: "荣誉成绩",
  "Selected results": "部分成果",
  MATHEMATICS: "数学",
  "Top 1%": "前 1%",
  "Top 20": "加拿大前 20",
  "Euclid Contest · Canada": "Euclid 数学竞赛",
  "ENTREPRENEURSHIP · 2024": "创业实践 · 2024",
  "Provincial top six": "安省前六",
  "Junior Achievement venture creating slippers from recycled wine corks.":
    "在 Junior Achievement 中，将回收红酒瓶塞转化为拖鞋产品创意。",
  "SELECTED WORK": "代表项目",
  "Projects and contributions": "项目与实践",
  "Evidence over labels": "用成果，而不是标签说话",
  "What I have started building.": "我已经开始构建的事物。",
  "QUANTITATIVE RESEARCH / GITHUB": "量化研究 / GITHUB",
  "W-Model Trading Research": "W-Model 交易研究",
  "RESEARCH WINDOW": "研究窗口",
  "MAY 2026": "2026 年 5 月",
  "Yahoo Finance · 130-symbol universe · 128 returned data": "Yahoo Finance · 130 只股票 · 128 只返回数据",
  "BASE W MODEL": "基础 W 模型",
  "+ TREND FILTER": "+ 趋势过滤",
  "MAX DRAWDOWN": "最大回撤",
  "PORTFOLIO TRADES": "组合执行交易",
  "QUALITY WIN RATE": "优质胜率",
  "ENDING EQUITY": "期末权益",
  "Simulated from $100,000 with 20% allocation per trade and at most five open positions.":
    "模拟起始资金为 $100,000，每笔交易配置 20%，同时最多持有五个仓位。",
  "Can a simple W-bottom pattern become more useful when market context is measured before entry?":
    "如果在入场前衡量市场环境，一个简单的 W 底形态能否变得更有效？",
  "01 / SIGNAL": "01 / 信号",
  "Early higher-low W on 5-minute candles": "5 分钟 K 线上的早期抬高低点 W",
  "02 / CONTEXT": "02 / 环境",
  "Prior 60-minute return greater than 1%": "入场前 60 分钟涨幅大于 1%",
  "03 / RISK": "03 / 风险",
  "3R target · 0.5% stop buffer · 240-minute limit": "3R 目标 · 0.5% 止损缓冲 · 最长 240 分钟",
  FINDING: "研究发现",
  "The pre-entry trend filter raised the simulated portfolio result from 16.16% to 23.94% and reduced maximum drawdown from 6.17% to 4.24%.":
    "加入入场前趋势过滤后，模拟组合回报从 16.16% 提高至 23.94%，最大回撤从 6.17% 降至 4.24%。",
  LIMITATION: "研究局限",
  "This is an in-sample May 2026 research result using zero commissions and no slippage. It is evidence of a testing process, not a forecast or trading recommendation.":
    "这是基于 2026 年 5 月样本内数据、零佣金且未计滑点的研究结果。它证明的是测试过程，而不是收益预测或交易建议。",
  "A Python research workflow for detecting, optimizing, and backtesting a W-bottom model on intraday equity data, including trend filters, risk rules, and a current-day scanner.":
    "一个基于 Python 的研究流程，用于在股票日内数据中识别、优化并回测 W 底模型，涵盖趋势过滤、风险规则与当日信号扫描。",
  "View repository": "查看代码仓库",
  "Inspect result data": "查看回测数据",
  "FRONTEND DEVELOPMENT / VOLUNTRACK": "前端开发 / VOLUNTRACK",
  "VolunTrack Frontend": "VolunTrack 前端开发",
  "Ongoing frontend development work, contributing implementation and interface details as the product continues to develop.":
    "持续参与前端开发，在产品迭代过程中贡献页面实现与界面细节。",
  "ENTREPRENEURSHIP / JUNIOR ACHIEVEMENT": "创业实践 / JUNIOR ACHIEVEMENT",
  "Cork Slipper Venture": "软木拖鞋创业项目",
  "A Junior Achievement product concept that repurposed wine corks into slippers, developed from an unusual material insight into a provincial top-six venture in 2024.":
    "一个将红酒瓶塞重新利用为拖鞋的 Junior Achievement 产品创意，并在 2024 年由材料洞察发展为安省前六项目。",
  "A clear line is open": "欢迎联系",
  "Have a problem where research and building meet?": "有一个需要研究与构建共同解决的问题？",
  "Write to Jeffrey": "联系 Jeffrey",
  "BASED IN TORONTO": "现居多伦多",
  "INCOMING U OF T ENGINEERING SCIENCE": "即将入读多大 ENGINEERING SCIENCE",
  "INTERESTED IN QUANTITATIVE RESEARCH AND NEW VENTURES": "关注量化研究与新项目",
  "Jeffrey Zhang / 张郅睿": "Jeffrey Zhang / 张郅睿",
  "Built from first principles. Deployed from Toronto.": "从第一性原理出发，在多伦多构建。",
  Email: "邮箱",
  Top: "顶部",
};

const originalTextNodes = [];
const dynamicTextIds = new Set(["local-time", "coord-x", "coord-y", "confidence", "year"]);
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
  acceptNode(node) {
    const parent = node.parentElement;
    if (!parent || ["SCRIPT", "STYLE"].includes(parent.tagName) || dynamicTextIds.has(parent.id)) {
      return NodeFilter.FILTER_REJECT;
    }
    return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
  },
});

while (textWalker.nextNode()) {
  const node = textWalker.currentNode;
  originalTextNodes.push({ node, original: node.nodeValue });
}

const pageCopy = {
  en: {
    title: "Jeffrey Zhang | Navyblue",
    description:
      "Jeffrey Zhang is an incoming University of Toronto Engineering Science student exploring quantitative research, markets, and software.",
    ogDescription:
      "Incoming U of T Engineering Science student building quantitative research and useful software.",
  },
  zh: {
    title: "张郅睿 Jeffrey Zhang | Navyblue",
    description:
      "张郅睿是即将入读多伦多大学 Engineering Science 的学生，正在探索量化研究、市场与软件开发。",
    ogDescription: "即将入读多大 Engineering Science，持续构建量化研究与实用软件。",
  },
};

const attributeCopy = {
  en: {
    ".skip-link": { text: "Skip to content" },
    ".wordmark": { "aria-label": "Navyblue, back to top" },
    ".nav-links": { "aria-label": "Primary navigation" },
    ".language-switch": { "aria-label": "Language" },
    ".signal-stage": { "aria-label": "Interactive signal field" },
    ".research-comparison": { "aria-label": "Simulated portfolio return improved from 16.16 percent to 23.94 percent after applying the trend filter" },
    ".ticker": { "aria-label": "Areas of practice" },
    ".working-code": { "aria-label": "Working principles" },
  },
  zh: {
    ".skip-link": { text: "跳至主要内容" },
    ".wordmark": { "aria-label": "Navyblue，返回顶部" },
    ".nav-links": { "aria-label": "主要导航" },
    ".language-switch": { "aria-label": "语言" },
    ".signal-stage": { "aria-label": "互动信号场" },
    ".research-comparison": { "aria-label": "加入趋势过滤后，模拟组合回报从 16.16% 提升至 23.94%" },
    ".ticker": { "aria-label": "关注领域" },
    ".working-code": { "aria-label": "行动原则" },
  },
};

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function updateThemeControl() {
  const language = root.lang === "zh-CN" ? "zh" : "en";
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  const labels = {
    en: { light: "Light", dark: "Dark", action: `Switch to ${nextTheme} mode` },
    zh: { light: "浅色", dark: "深色", action: `切换至${nextTheme === "light" ? "浅色" : "深色"}模式` },
  };
  themeLabel.textContent = labels[language][nextTheme];
  themeToggle.setAttribute("aria-label", labels[language].action);
}

function setTheme(theme) {
  root.dataset.theme = theme;
  themeColor.setAttribute("content", theme === "light" ? "#edf3fb" : "#081725");
  updateThemeControl();
}

function setLanguage(language) {
  const isChinese = language === "zh";
  root.lang = isChinese ? "zh-CN" : "en";

  originalTextNodes.forEach(({ node, original }) => {
    const key = normalizeText(original);
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    node.nodeValue = isChinese && translations[key]
      ? `${leading}${translations[key]}${trailing}`
      : original;
  });

  const copy = pageCopy[language];
  document.title = copy.title;
  document.querySelector('meta[name="description"]').setAttribute("content", copy.description);
  document.querySelector('meta[property="og:title"]').setAttribute("content", copy.title);
  document.querySelector('meta[property="og:description"]').setAttribute("content", copy.ogDescription);

  Object.entries(attributeCopy[language]).forEach(([selector, values]) => {
    const element = document.querySelector(selector);
    if (!element) return;
    Object.entries(values).forEach(([attribute, value]) => {
      if (attribute === "text") element.textContent = value;
      else element.setAttribute(attribute, value);
    });
  });

  languageOptions.forEach((option) => {
    const active = option.dataset.language === language;
    option.classList.toggle("is-active", active);
    option.setAttribute("aria-pressed", String(active));
  });

  localStorage.setItem("language", language);
  updateThemeControl();
}

setTheme(savedTheme || "dark");
setLanguage(savedLanguage || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en"));

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  setTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});

languageOptions.forEach((option) => {
  option.addEventListener("click", () => setLanguage(option.dataset.language));
});

document.querySelector("#year").textContent = new Date().getFullYear();

const timeDisplay = document.querySelector("#local-time");

function updateTime() {
  const time = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
  timeDisplay.textContent = `${time} TOR`;
}

updateTime();
setInterval(updateTime, 1000);

const signalStage = document.querySelector(".signal-stage");
const signalGrid = document.querySelector("#signal-grid");
const crosshairX = document.querySelector(".crosshair-x");
const crosshairY = document.querySelector(".crosshair-y");
const crosshairDot = document.querySelector(".signal-crosshair i");
const coordX = document.querySelector("#coord-x");
const coordY = document.querySelector("#coord-y");
const confidence = document.querySelector("#confidence");
const signalCells = [];

for (let index = 0; index < 108; index += 1) {
  const cell = document.createElement("span");
  cell.className = "signal-cell";
  const pulse = (Math.sin(index * 1.83) + 1) / 2;
  cell.style.setProperty("--opacity", (0.12 + pulse * 0.4).toFixed(2));
  cell.style.setProperty("--size", `${2 + pulse * 4}px`);
  if (index % 17 === 0 || index % 31 === 0) {
    cell.style.setProperty("--cell-color", "var(--lime)");
    cell.style.setProperty("--glow", "10px");
  }
  signalGrid.appendChild(cell);
  signalCells.push(cell);
}

function setSignalPosition(xPercent, yPercent) {
  const safeX = Math.max(0, Math.min(100, xPercent));
  const safeY = Math.max(0, Math.min(100, yPercent));
  crosshairY.style.left = `${safeX}%`;
  crosshairX.style.top = `${safeY}%`;
  crosshairDot.style.left = `${safeX}%`;
  crosshairDot.style.top = `${safeY}%`;
  coordX.textContent = String(Math.round(safeX)).padStart(3, "0");
  coordY.textContent = String(Math.round(safeY)).padStart(3, "0");
  const score = 72 + Math.abs(Math.sin((safeX + safeY) * 0.08)) * 25;
  confidence.textContent = `${score.toFixed(1)}%`;

  const columns = 12;
  signalCells.forEach((cell, index) => {
    const cellX = ((index % columns) + 0.5) / columns * 100;
    const cellY = (Math.floor(index / columns) + 0.5) / 9 * 100;
    const distance = Math.hypot(cellX - safeX, cellY - safeY);
    const influence = Math.max(0, 1 - distance / 32);
    const basePulse = (Math.sin(index * 1.83) + 1) / 2;
    if (influence > 0) {
      cell.style.setProperty("--size", `${3 + influence * 10}px`);
      cell.style.setProperty("--opacity", `${0.25 + influence * 0.75}`);
      cell.style.setProperty("--glow", `${influence * 15}px`);
    } else {
      cell.style.setProperty("--size", `${2 + basePulse * 4}px`);
      cell.style.setProperty("--opacity", (0.12 + basePulse * 0.4).toFixed(2));
      cell.style.setProperty("--glow", index % 17 === 0 || index % 31 === 0 ? "10px" : "0");
    }
  });
}

signalStage.addEventListener("pointermove", (event) => {
  const bounds = signalGrid.getBoundingClientRect();
  const x = (event.clientX - bounds.left) / bounds.width * 100;
  const y = (event.clientY - bounds.top) / bounds.height * 100;
  setSignalPosition(x, y);
});

signalStage.addEventListener("pointerleave", () => setSignalPosition(56, 48));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
