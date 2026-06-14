const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeLabel = document.querySelector(".theme-label");
const themeColor = document.querySelector('meta[name="theme-color"]');
const savedTheme = localStorage.getItem("theme");

function setTheme(theme) {
  root.dataset.theme = theme;
  const nextTheme = theme === "light" ? "dark" : "light";
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
  themeLabel.textContent = nextTheme === "light" ? "Light" : "Dark";
  themeColor.setAttribute("content", theme === "light" ? "#edf3fb" : "#061225");
}

setTheme(savedTheme || "dark");

themeToggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";
  setTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
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
