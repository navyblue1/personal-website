const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const themeColor = document.querySelector('meta[name="theme-color"]');
const languageOptions = document.querySelectorAll(".language-option");
const savedTheme = localStorage.getItem("theme");
const savedLanguage = localStorage.getItem("language");

const translations = {
  "Skip to content": "跳至主要内容",
  About: "关于我",
  Experience: "经历",
  Work: "项目",
  Contact: "联系",
  "Open to collaborations": "欢迎交流合作",
  "I look for": "我在杂乱数据里",
  signal: "找信号",
  "in messy data.": "再用实验验证。",
  "I am an incoming Engineering Science student at the University of Toronto. I like quantitative research because it makes ideas survive data, code, and uncomfortable assumptions.":
    "我即将进入多伦多大学工程科学专业。现在最感兴趣的是量化研究，也喜欢把松散的想法写成代码，看看它们到底站不站得住。",
  "Explore my work": "查看我的项目",
  "Start a conversation": "与我交流",
  "LIVE SIGNAL FIELD": "实时信号场",
  "Move through the field to inspect the signal.": "移动光标，观察信号变化。",
  "U OF T ENGINEERING SCIENCE": "多大工程科学",
  "QUANTITATIVE RESEARCH": "量化研究",
  "FRONTEND DEVELOPMENT": "前端开发",
  ENTREPRENEURSHIP: "创业实践",
  ABOUT: "关于我",
  "How I work through problems": "我怎样处理问题",
  "I am finishing high school in Toronto and will start Engineering Science at U of T next. The pattern I keep coming back to is simple: ask a question, build a small version, test it, and keep the part that holds up.":
    "我正在多伦多读完高中，接下来去多大读 Engineering Science。我反复发现自己喜欢一种工作方式：先问清楚问题，做一个小版本，测试，再留下经得住检验的部分。",
  "Quantitative research appeals to me because a good-sounding idea cannot hide for very long. The assumptions have to be clear, the test has to run, and the result deserves attention even when it is not what I wanted.":
    "我喜欢量化研究，是因为一个听起来不错的想法很快就会被数据追问。假设要写清楚，测试要跑，结果不好看也得看完。",
  "I also like building things people can actually use: a frontend feature, a trading-model notebook, or a product idea made from a material most people would throw away.":
    "我也喜欢做真正有人会用的东西：前端功能、交易模型笔记本，或者把别人可能会扔掉的材料做成产品。",
  "WORKING HABITS": "工作习惯",
  START: "开始",
  "Ask the question plainly": "把问题问清楚",
  TEST: "测试",
  "Build the smallest useful model": "先做最小可用模型",
  LEARN: "复盘",
  "Keep what survives the data": "留下经得住数据的部分",
  JOURNEY: "成长路径",
  "Education and experience": "教育与经历",
  "Early, but not waiting.": "还早，但我没有等着开始。",
  "Where I have been learning.": "我把时间花在哪里。",
  "2026 / NEXT": "2026 / 即将开始",
  "MAY 2025 / PRESENT": "2025.05 / 至今",
  EDUCATION: "教育",
  "University of Toronto": "多伦多大学",
  "Starting Engineering Science in 2026.": "2026 年开始 Engineering Science。",
  EXPERIENCE: "经历",
  "Frontend Developer · VolunTrack": "前端开发 · VolunTrack",
  "Working on frontend screens and interaction details as the product changes.":
    "随着产品变化，继续做前端页面和交互细节。",
  "PRODUCT / WEB": "产品 / 前端",
  "TORONTO, ON": "加拿大 · 多伦多",
  "Earl Haig Secondary School": "Earl Haig 中学",
  "Spent high school leaning into math, contests, and projects I could build myself.":
    "高中阶段主要投入数学、竞赛和自己动手做的项目。",
  DISTINCTIONS: "荣誉成绩",
  "A few concrete signals": "几个具体信号",
  MATHEMATICS: "数学",
  "Top 1%": "前 1%",
  "Top 20": "加拿大前 20",
  "Euclid Contest · Canada": "Euclid 数学竞赛",
  "ENTREPRENEURSHIP · 2024": "创业实践 · 2024",
  "Top six in Ontario": "安省前六",
  "Helped develop a slipper idea using recycled wine corks; the venture placed top six in Ontario.":
    "参与开发了一个用回收红酒瓶塞做拖鞋的想法；项目在 Junior Achievement 中进入安省前六。",
  "SELECTED WORK": "代表项目",
  "Projects I can point to": "我能拿出来看的项目",
  "A few things I have tested": "几个真的跑过的东西",
  "Work with evidence.": "有证据的项目。",
  "QUANTITATIVE RESEARCH / GITHUB": "量化研究 / GITHUB",
  "W-Model Trading Research": "W-Model 交易研究",
  "RESEARCH WINDOW": "研究窗口",
  "MAY 2026": "2026 年 5 月",
  "Yahoo Finance · tested 130 symbols · data returned for 128": "Yahoo Finance · 测试 130 只股票 · 128 只有数据",
  "BASE W MODEL": "基础 W 模型",
  "+ TREND FILTER": "+ 趋势过滤",
  "MAX DRAWDOWN": "最大回撤",
  "TRADES TAKEN": "实际执行",
  "TRADES RETURNING ≥1%": "单笔收益 ≥1%",
  "SIMULATED END VALUE": "模拟期末资金",
  "The backtest starts with a simulated $100,000. Each trade uses 20% of current equity, with at most five open positions.":
    "回测从模拟 $100,000 开始。每笔交易使用当前权益的 20%，最多同时持有五个仓位。",
  "I wanted to know whether a W-bottom signal gets better if I check market context before entry.":
    "我想知道：如果入场前先看市场环境，W 底信号会不会更好一点？",
  "01 / SIGNAL": "01 / 信号",
  "Early higher-low W on 5-minute bars": "5 分钟 K 线中，第二个低点更高的早期 W 形态",
  "02 / CONTEXT": "02 / 环境",
  "60-minute return above 1% before entry": "入场前 60 分钟涨幅大于 1%",
  "03 / RISK": "03 / 风险",
  "3R target · 0.5% stop buffer · exit after 240 minutes": "3R 止盈目标 · 0.5% 止损缓冲 · 240 分钟后离场",
  FINDING: "研究发现",
  "With the trend filter, simulated return moved from 16.16% to 23.94%, and max drawdown moved down from 6.17% to 4.24%.":
    "加入趋势过滤后，模拟回报从 16.16% 到 23.94%，最大回撤从 6.17% 降到 4.24%。",
  LIMITATION: "研究局限",
  "This is still in-sample work: the model and filter were chosen on the same May 2026 data. It also assumes no commissions and no slippage, so I treat it as process evidence, not a promise.":
    "这仍然是样本内研究：模型和过滤条件都来自同一组 2026 年 5 月数据。结果也没有计入佣金和滑点，所以我把它当作研究过程，而不是收益承诺。",
  "A Python research workflow for detecting, optimizing, and backtesting a W-bottom model on intraday equity data, including trend filters, risk rules, and a current-day scanner.":
    "一个基于 Python 的研究流程，用于在股票日内数据中识别、优化并回测 W 底模型，涵盖趋势过滤、风险规则与当日信号扫描。",
  "View repository": "查看代码仓库",
  "Inspect result data": "查看回测数据",
  "FRONTEND DEVELOPMENT / VOLUNTRACK": "前端开发 / VOLUNTRACK",
  "VolunTrack Frontend": "VolunTrack 前端开发",
  "I work on frontend screens for VolunTrack as the product changes, with a close eye on clean implementation and the small details people feel before they notice.":
    "我在 VolunTrack 做前端页面，也跟着产品变化调整交互细节。现在更关注代码是否清楚，以及那些容易被忽略的小体验。",
  "ENTREPRENEURSHIP / JUNIOR ACHIEVEMENT": "创业实践 / JUNIOR ACHIEVEMENT",
  "Cork Slipper Venture": "软木拖鞋创业项目",
  "This started as a strange material question: could recycled wine corks become slippers? It became a Junior Achievement venture and placed top six in Ontario in 2024.":
    "这个项目一开始只是一个有点奇怪的材料问题：回收红酒瓶塞能不能做成拖鞋？后来它成为 Junior Achievement 项目，并在 2024 年进入安省前六。",
  "Open to good problems": "欢迎带着好问题来聊",
  "Have a problem that needs both research and building?": "有一个问题，既需要研究，也需要动手做出来吗？",
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
    description:
      "Jeffrey Zhang is an incoming U of T Engineering Science student in Toronto, working on quantitative research, frontend software, and testable project ideas.",
    ogDescription:
      "Incoming U of T Engineering Science student working on quantitative research, frontend software, and testable project ideas.",
  },
  zh: {
    title: "张郅睿 Jeffrey Zhang | Navyblue",
    description:
      "张郅睿即将进入多伦多大学工程科学专业，关注量化研究、前端开发和可以被验证的项目想法。",
    ogDescription: "即将进入多伦多大学工程科学专业，关注量化研究、前端开发和可验证的项目想法。",
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
    ".working-code": { "aria-label": "Working habits" },
  },
  zh: {
    ".skip-link": { text: "跳至主要内容" },
    ".wordmark": { "aria-label": "Navyblue，返回顶部" },
    ".nav-links": { "aria-label": "主要导航" },
    ".language-switch": { "aria-label": "语言" },
    ".signal-stage": { "aria-label": "互动信号场" },
    ".research-comparison": { "aria-label": "加入趋势过滤后，模拟回报从 16.16% 提升到 23.94%" },
    ".ticker": { "aria-label": "关注领域" },
    ".working-code": { "aria-label": "工作习惯" },
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
  themeColor.setAttribute("content", theme === "light" ? "#eef5f2" : "#071420");
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
