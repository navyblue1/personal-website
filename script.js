const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const themeColor = document.querySelector('meta[name="theme-color"]');
const canonicalLink = document.querySelector('link[rel="canonical"]');
const languageOptions = document.querySelectorAll(".language-option");
const zhOnlyElements = document.querySelectorAll("[data-zh-only]");
const savedTheme = localStorage.getItem("theme");
const savedLanguage = localStorage.getItem("language");
const languagePaths = new Set(["en", "zh"]);

const translations = {
  "Skip to content": "跳至主要内容",
  About: "关于我",
  Experience: "经历",
  Work: "项目",
  Contact: "联系",
  "Open to collaborations": "欢迎交流合作",
  "I test": "用数据",
  signals: "验证信号",
  "with data.": "形成判断。",
  "I am an incoming Engineering Science student at the University of Toronto, interested in quantitative research and software systems that make hypotheses testable.":
    "我即将就读多伦多大学工程科学专业，关注量化研究，以及能够让假设被清晰检验的软件系统。",
  "Explore my work": "查看我的项目",
  "Start a conversation": "与我交流",
  "LIVE SIGNAL FIELD": "实时信号场",
  "Move through the field to inspect the signal.": "移动光标，观察信号变化。",
  "U OF T ENGINEERING SCIENCE": "多伦多大学工程科学",
  "QUANTITATIVE RESEARCH": "量化研究",
  "FRONTEND DEVELOPMENT": "前端开发",
  ENTREPRENEURSHIP: "创业实践",
  ABOUT: "关于我",
  "How I approach problems": "问题处理方式",
  "I am completing high school in Toronto and will begin Engineering Science at U of T in 2026. My work usually starts with a question, then moves into a model, prototype, or experiment that can be checked against evidence.":
    "我正在多伦多完成高中学业，并将于 2026 年进入多伦多大学工程科学专业。我的项目通常从一个问题开始，再转化为可以用证据检验的模型、原型或实验。",
  "Quantitative research appeals to me because it requires clear assumptions, careful testing, and honest interpretation of results.":
    "我对量化研究感兴趣，是因为它要求明确假设、严谨测试，并如实理解结果。",
  "I also value practical building: frontend work, research notebooks, and product ideas that turn constraints into something usable.":
    "我也重视实际构建，包括前端开发、研究笔记本，以及把限制条件转化为可用产品的想法。",
  WORKFLOW: "工作流程",
  QUESTION: "问题",
  "Define the hypothesis": "明确假设",
  MODEL: "模型",
  "Build a testable version": "构建可测试版本",
  EVIDENCE: "证据",
  "Evaluate the result": "评估结果",
  JOURNEY: "成长路径",
  "Education and experience": "教育与经历",
  "Education and project work": "教育与项目经历",
  "Education, experience, and milestones.": "教育、经历与阶段成果。",
  "2026 / NEXT": "2026 / 即将开始",
  "MAY 2025 / PRESENT": "2025.05 / 至今",
  EDUCATION: "教育",
  "University of Toronto": "多伦多大学",
  "Beginning Engineering Science in 2026.": "将于 2026 年开始工程科学专业学习。",
  EXPERIENCE: "经历",
  "Frontend Developer · VolunTrack": "前端开发 · VolunTrack",
  "Developing frontend interfaces and interaction details as the product evolves.":
    "随着产品迭代，参与前端界面与交互细节开发。",
  "PRODUCT / WEB": "产品 / 前端",
  "TORONTO, ON": "加拿大 · 多伦多",
  "Earl Haig Secondary School": "Earl Haig 中学",
  "Focused on mathematics, contests, and project-based learning.":
    "高中阶段重点投入数学、竞赛和项目式学习。",
  DISTINCTIONS: "荣誉成绩",
  "Selected results": "部分成果",
  MATHEMATICS: "数学",
  "Top 1%": "前 1%",
  "Top 20": "加拿大前 20",
  "Euclid Contest · Canada": "Euclid 数学竞赛",
  "ENTREPRENEURSHIP · 2024": "创业实践 · 2024",
  "Top six in Ontario": "安省前六",
  "Developed a Junior Achievement venture concept using recycled wine corks as the core material for slippers.":
    "以回收红酒瓶塞为核心材料，开发 Junior Achievement 拖鞋创业项目概念。",
  "SELECTED WORK": "代表项目",
  "Projects and contributions": "项目与实践",
  "Selected project work": "代表性项目",
  "Research and building in practice.": "研究与构建实践。",
  "QUANTITATIVE RESEARCH / GITHUB": "量化研究 / GITHUB",
  "W-Model Trading Research": "W-Model 交易研究",
  "RESEARCH WINDOW": "研究窗口",
  "MAY 2026": "2026 年 5 月",
  "Yahoo Finance · 130 symbols tested · 128 with available data": "Yahoo Finance · 测试 130 只股票 · 128 只获得数据",
  "BASE W MODEL": "基础 W 模型",
  "+ TREND FILTER": "+ 趋势过滤",
  "MAX DRAWDOWN": "最大回撤",
  "TRADES TAKEN": "实际执行",
  "TRADES RETURNING ≥1%": "单笔收益 ≥1%",
  "SIMULATED END VALUE": "模拟期末资金",
  "The backtest starts with a simulated $100,000. Each trade uses 20% of current equity, with at most five open positions.":
    "回测从模拟 $100,000 开始。每笔交易使用当前权益的 20%，最多同时持有五个仓位。",
  "I tested whether adding market context before entry improves a W-bottom signal.":
    "我测试了在入场前加入市场环境判断，是否能改善 W 底信号表现。",
  "01 / SIGNAL": "01 / 信号",
  "Early higher-low W pattern on 5-minute bars": "5 分钟 K 线中第二个低点更高的早期 W 形态",
  "02 / CONTEXT": "02 / 环境",
  "60-minute pre-entry return above 1%": "入场前 60 分钟收益率大于 1%",
  "03 / RISK": "03 / 风险",
  "3R target · 0.5% stop buffer · exit after 240 minutes": "3R 止盈目标 · 0.5% 止损缓冲 · 240 分钟后离场",
  FINDING: "研究发现",
  "After adding the trend filter, simulated return increased from 16.16% to 23.94%, while maximum drawdown decreased from 6.17% to 4.24%.":
    "加入趋势过滤后，模拟回报从 16.16% 提升至 23.94%，最大回撤从 6.17% 降至 4.24%。",
  LIMITATION: "研究局限",
  "The model and filter were selected using the same May 2026 sample. Results exclude commissions and slippage, so they should be read as research evidence rather than expected future performance.":
    "模型与过滤条件均基于同一组 2026 年 5 月样本选择。结果未计入佣金和滑点，因此应被理解为研究过程中的证据，而非对未来表现的预期。",
  "A Python research workflow for detecting, optimizing, and backtesting a W-bottom model on intraday equity data, including trend filters, risk rules, and a current-day scanner.":
    "一个基于 Python 的研究流程，用于在股票日内数据中识别、优化并回测 W 底模型，涵盖趋势过滤、风险规则与当日信号扫描。",
  "View repository": "查看代码仓库",
  "Inspect result data": "查看回测数据",
  "FRONTEND DEVELOPMENT / VOLUNTRACK": "前端开发 / VOLUNTRACK",
  "VolunTrack Frontend": "VolunTrack 前端开发",
  "I contribute to frontend interface development for VolunTrack, focusing on clear implementation and consistent interaction details as the product evolves.":
    "我参与 VolunTrack 的前端界面开发，并在产品迭代中关注清晰实现和一致的交互细节。",
  "ENTREPRENEURSHIP / JUNIOR ACHIEVEMENT": "创业实践 / JUNIOR ACHIEVEMENT",
  "Cork Slipper Venture": "软木拖鞋创业项目",
  "Developed a Junior Achievement venture concept using recycled wine corks as the core material for slippers; the project placed top six in Ontario in 2024.":
    "以回收红酒瓶塞为拖鞋核心材料，开发 Junior Achievement 创业项目概念；该项目于 2024 年进入安省前六。",
  "Open to research and project conversations": "欢迎交流研究与项目",
  "Interested in research-driven building?": "如果你关注研究驱动的项目构建，欢迎联系。",
  "Email Jeffrey": "给 Jeffrey 发邮件",
  "BASED IN TORONTO": "现居多伦多",
  "INCOMING U OF T ENGINEERING SCIENCE": "即将就读多伦多大学工程科学专业",
  "OPEN TO QUANTITATIVE RESEARCH AND EARLY-STAGE PROJECTS": "愿意聊量化研究和早期项目",
  "Jeffrey Zhang / 张郅睿": "Jeffrey Zhang / 张郅睿",
  "Designed, written, and deployed from Toronto.": "在多伦多设计、写完并部署。",
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
    canonical: "https://navyblue1.vercel.app/en",
    description:
      "Jeffrey Zhang is an incoming University of Toronto Engineering Science student focused on quantitative research, frontend development, and testable project work.",
    ogDescription:
      "Incoming U of T Engineering Science student focused on quantitative research, frontend development, and testable project work.",
  },
  zh: {
    title: "张郅睿 Jeffrey Zhang | Navyblue",
    canonical: "https://navyblue1.vercel.app/zh",
    description:
      "张郅睿即将就读多伦多大学工程科学专业，关注量化研究、前端开发和可验证的项目实践。",
    ogDescription: "即将就读多伦多大学工程科学专业，关注量化研究、前端开发和可验证的项目实践。",
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
    ".social-grid": { "aria-label": "Social links" },
    ".ticker": { "aria-label": "Areas of practice" },
    ".working-code": { "aria-label": "Workflow" },
  },
  zh: {
    ".skip-link": { text: "跳至主要内容" },
    ".wordmark": { "aria-label": "Navyblue，返回顶部" },
    ".nav-links": { "aria-label": "主要导航" },
    ".language-switch": { "aria-label": "语言" },
    ".signal-stage": { "aria-label": "互动信号场" },
    ".research-comparison": { "aria-label": "加入趋势过滤后，模拟回报从 16.16% 提升到 23.94%" },
    ".social-grid": { "aria-label": "社交账号" },
    ".ticker": { "aria-label": "关注领域" },
    ".working-code": { "aria-label": "工作流程" },
  },
};

function normalizeText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function getLanguageFromPath() {
  const firstPathPart = window.location.pathname.split("/").filter(Boolean)[0];
  return languagePaths.has(firstPathPart) ? firstPathPart : null;
}

function buildLanguagePath(language) {
  const hash = window.location.hash || "";
  if (language === "en" && hash === "#challenge") return `/${language}`;
  return `/${language}${hash}`;
}

function syncLanguageVisibility(language) {
  const showChineseOnly = language === "zh";
  zhOnlyElements.forEach((element) => {
    element.hidden = !showChineseOnly;
  });

  if (!showChineseOnly && window.location.hash === "#challenge") {
    window.history.replaceState({ language }, "", window.location.pathname || "/en");
  }
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
  themeColor.setAttribute("content", theme === "light" ? "#eef5f2" : "#071420");
  updateThemeControl();
}

function setLanguage(language, { updateUrl = false } = {}) {
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
  canonicalLink?.setAttribute("href", copy.canonical);
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
    if (active) option.setAttribute("aria-current", "page");
    else option.removeAttribute("aria-current");
  });

  syncLanguageVisibility(language);
  localStorage.setItem("language", language);
  if (updateUrl) {
    const nextPath = buildLanguagePath(language);
    if (`${window.location.pathname}${window.location.hash}` !== nextPath) {
      window.history.pushState({ language }, "", nextPath);
    }
  }
  updateThemeControl();
}

setTheme(savedTheme || "dark");
setLanguage(getLanguageFromPath() || savedLanguage || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en"));

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  setTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});

languageOptions.forEach((option) => {
  option.addEventListener("click", (event) => {
    event.preventDefault();
    setLanguage(option.dataset.language, { updateUrl: true });
  });
});

window.addEventListener("popstate", () => {
  const languageFromPath = getLanguageFromPath();
  if (languageFromPath) setLanguage(languageFromPath);
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
