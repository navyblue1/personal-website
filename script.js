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
  "I find the": "我从噪声中",
  signal: "寻找信号",
  "in noise.": "把判断变成行动。",
  "Incoming Engineering Science student at the University of Toronto, exploring quantitative research and building software that turns ideas into testable systems.":
    "即将就读多伦多大学工程科学专业。我关注量化研究，也喜欢把想法做成可以验证、真正有用的工具。",
  "Explore my work": "查看我的项目",
  "Start a conversation": "与我交流",
  "LIVE SIGNAL FIELD": "实时信号场",
  "Move through the field to inspect the signal.": "移动光标，观察信号变化。",
  "U OF T ENGINEERING SCIENCE": "多大工程科学",
  "QUANTITATIVE RESEARCH": "量化研究",
  "FRONTEND DEVELOPMENT": "前端开发",
  ENTREPRENEURSHIP: "创业实践",
  ABOUT: "关于我",
  "How I think and build": "我的思考与实践",
  "I am finishing high school in Toronto and will soon begin Engineering Science at the University of Toronto. I learn best by turning questions into models, products, and experiments.":
    "我正在多伦多完成高中学业，即将进入多伦多大学工程科学专业。对我来说，最好的学习方式，是把问题做成模型、产品和实验。",
  "I am drawn to quantitative research because it requires imagination and discipline in equal measure: frame a hypothesis, state the assumptions, test it with data, and learn honestly from failure.":
    "我喜欢量化研究，因为它同时需要想象力和纪律：提出假设，写清前提，用数据检验，并认真理解结果为什么会失败。",
  "I care about building things that are useful beyond the exercise itself. That could mean shipping a frontend feature, testing a market model, or turning an unusual material into a product.":
    "我也希望做出来的东西不只停留在练习里。它可以是一个真正上线的前端功能、一套经过检验的市场模型，也可以是把一种意想不到的材料变成产品。",
  "OPERATING PRINCIPLES": "行动原则",
  INPUT: "起点",
  "Ask a testable question": "提出可检验的问题",
  PROCESS: "过程",
  "Build and challenge the model": "构建并挑战模型",
  OUTPUT: "结果",
  "Create measurable value": "创造可衡量的价值",
  JOURNEY: "成长路径",
  "Education and experience": "教育与经历",
  "Still early. Already building.": "路还很长，但我已经开始动手。",
  "The path so far.": "到目前为止，我走过的路。",
  "2026 / NEXT": "2026 / 即将开始",
  "MAY 2025 / PRESENT": "2025.05 / 至今",
  EDUCATION: "教育",
  "University of Toronto": "多伦多大学",
  "Incoming Engineering Science student.": "即将就读工程科学专业。",
  EXPERIENCE: "经历",
  "Frontend Developer · VolunTrack": "前端开发 · VolunTrack",
  "Building and refining frontend interfaces as the product evolves.":
    "参与产品前端界面的开发与迭代，并随着产品推进持续完善实现细节。",
  "PRODUCT / WEB": "产品 / 前端",
  "TORONTO, ON": "加拿大 · 多伦多",
  "Earl Haig Secondary School": "Earl Haig 中学",
  "Focused on mathematics, problem solving, and learning by building.":
    "高中阶段主要投入数学、问题解决，也通过亲手做项目来学习。",
  DISTINCTIONS: "荣誉成绩",
  "Selected milestones": "阶段性成果",
  MATHEMATICS: "数学",
  "Top 1%": "前 1%",
  "Top 20": "加拿大前 20",
  "Euclid Contest · Canada": "Euclid 数学竞赛",
  "ENTREPRENEURSHIP · 2024": "创业实践 · 2024",
  "Top six in Ontario": "安省前六",
  "Built a Junior Achievement venture around slippers made from recycled wine corks.":
    "在 Junior Achievement 中，我们把回收红酒瓶塞做成拖鞋，并将这个想法发展成创业项目。",
  "SELECTED WORK": "代表项目",
  "Projects and contributions": "项目与实践",
  "Let the work speak": "让作品自己说话",
  "What I am building.": "我正在做的事。",
  "QUANTITATIVE RESEARCH / GITHUB": "量化研究 / GITHUB",
  "W-Model Trading Research": "W-Model 交易研究",
  "RESEARCH WINDOW": "研究窗口",
  "MAY 2026": "2026 年 5 月",
  "Yahoo Finance · 130-symbol universe · data available for 128 symbols": "Yahoo Finance · 覆盖 130 只股票 · 其中 128 只取得数据",
  "BASE W MODEL": "基础 W 模型",
  "+ TREND FILTER": "+ 趋势过滤",
  "MAX DRAWDOWN": "最大回撤",
  "TRADES TAKEN": "实际执行",
  "TRADES RETURNING ≥1%": "单笔收益 ≥1%",
  "SIMULATED END VALUE": "模拟期末资金",
  "Starting with a simulated $100,000, each trade used 20% of current equity with no more than five positions open.":
    "模拟以 $100,000 起步，每笔交易使用当时权益的 20%，同时最多持有五个仓位。",
  "Does a simple W-bottom signal improve when I measure market context before entry?":
    "如果在入场前先衡量市场环境，一个简单的 W 底信号会不会更有效？",
  "01 / SIGNAL": "01 / 信号",
  "An early higher-low W on 5-minute bars": "5 分钟 K 线中，第二个低点更高的早期 W 形态",
  "02 / CONTEXT": "02 / 环境",
  "Prior 60-minute return greater than 1%": "入场前 60 分钟涨幅大于 1%",
  "03 / RISK": "03 / 风险",
  "3R target · 0.5% stop buffer · exit after 240 minutes": "3R 止盈目标 · 0.5% 止损缓冲 · 240 分钟后离场",
  FINDING: "研究发现",
  "Adding the pre-entry trend filter raised the simulated return from 16.16% to 23.94% while reducing maximum drawdown from 6.17% to 4.24%.":
    "加入入场前趋势过滤后，模拟回报从 16.16% 提升到 23.94%，最大回撤也从 6.17% 降到 4.24%。",
  LIMITATION: "研究局限",
  "The model and filter were selected on the same May 2026 sample. Results assume zero commissions and no slippage, so they show a research process, not expected future returns.":
    "模型和过滤条件都在同一组 2026 年 5 月样本上选出，结果也没有计入佣金和滑点。因此，这里展示的是研究过程，而不是对未来收益的预测。",
  "A Python research workflow for detecting, optimizing, and backtesting a W-bottom model on intraday equity data, including trend filters, risk rules, and a current-day scanner.":
    "一个基于 Python 的研究流程，用于在股票日内数据中识别、优化并回测 W 底模型，涵盖趋势过滤、风险规则与当日信号扫描。",
  "View repository": "查看代码仓库",
  "Inspect result data": "查看回测数据",
  "FRONTEND DEVELOPMENT / VOLUNTRACK": "前端开发 / VOLUNTRACK",
  "VolunTrack Frontend": "VolunTrack 前端开发",
  "Building and refining frontend interfaces as the product develops, with a focus on clear implementation and thoughtful interaction details.":
    "随着产品推进，持续开发并完善前端界面，重点关注清晰的实现和有分寸的交互细节。",
  "ENTREPRENEURSHIP / JUNIOR ACHIEVEMENT": "创业实践 / JUNIOR ACHIEVEMENT",
  "Cork Slipper Venture": "软木拖鞋创业项目",
  "Turned an unusual material idea, recycled wine corks, into a slipper concept that placed among Ontario's top six Junior Achievement ventures in 2024.":
    "我们从回收红酒瓶塞这种不寻常的材料出发，做出拖鞋产品概念，并在 2024 年进入 Junior Achievement 安省前六。",
  "Open to a conversation": "欢迎来聊聊",
  "Working on something that needs both research and building?": "如果你正在做一件既需要研究、也需要动手实现的事，我们可以聊聊。",
  "Email Jeffrey": "给 Jeffrey 发邮件",
  "BASED IN TORONTO": "现居多伦多",
  "INCOMING U OF T ENGINEERING SCIENCE": "即将就读多伦多大学工程科学专业",
  "OPEN TO QUANTITATIVE RESEARCH AND EARLY-STAGE PROJECTS": "期待量化研究与早期项目合作",
  "Jeffrey Zhang / 张郅睿": "Jeffrey Zhang / 张郅睿",
  "Built from first principles. Deployed from Toronto.": "从问题出发，在多伦多构建。",
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
      "Jeffrey Zhang is an incoming University of Toronto Engineering Science student exploring quantitative research and building useful software.",
    ogDescription:
      "Incoming U of T Engineering Science student exploring quantitative research and building useful software.",
  },
  zh: {
    title: "张郅睿 Jeffrey Zhang | Navyblue",
    description:
      "张郅睿即将就读多伦多大学工程科学专业，关注量化研究，也在持续开发真正有用的软件工具。",
    ogDescription: "即将就读多伦多大学工程科学专业，关注量化研究与实用软件开发。",
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
    ".research-comparison": { "aria-label": "加入趋势过滤后，模拟回报从 16.16% 提升到 23.94%" },
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
