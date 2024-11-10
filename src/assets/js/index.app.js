// RUNNING TEXT ANIMATION

const WORD = "Running";
const CURSOR = "_";

const wordEle = document.getElementById("r-word");
const cursorEle = document.getElementById("r-cursor");

const initTypingAnimation = () => {
  cursorEle.textContent = "";
  cursorEle.className = "";

  let tempWord = "";
  wordEle.textContent = CURSOR;

  const intervalId = setInterval(() => {
    if (tempWord === WORD) {
      clearInterval(intervalId);
      wordEle.textContent = WORD;
      cursorEle.textContent = CURSOR;
      cursorEle.className = "flicker";
      return;
    }

    tempWord += WORD[tempWord.length];
    wordEle.textContent = tempWord + CURSOR;
  }, 250);
};

setTimeout(() => {
  initTypingAnimation();
  setInterval(initTypingAnimation, 6000);
}, 1000);

// TITLE ANIMATION

const titleEle = document.getElementById("main-title");
const originalText = "Futuriza Me";

const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const randomLetter = () => {
  return LETTERS[Math.floor(Math.random() * LETTERS.length)];
};

const startAnimation = (timeConfig, endTimestamp) => {
  const intervalId = setInterval(() => {
    const now = Date.now();

    titleEle.textContent = timeConfig
      .map((endAt, index) => {
        if (originalText[index] === " " || now >= endAt) {
          return originalText[index];
        }

        return randomLetter();
      })
      .join("");

    if (now >= endTimestamp) {
      clearInterval(intervalId);
    }
  }, 100);
};

const buildTimeConfig = (length, endTimestamp) => {
  return Array.from(new Array(length), (_, index) => {
    const deltaMs = (length - (index + 1)) * 400;

    return endTimestamp - deltaMs;
  });
};

const startTitleAnimation = (durationMs) => {
  const startTimestamp = Date.now();
  const endTimestamp = startTimestamp + durationMs;

  const length = originalText.length;

  const timeConfig = buildTimeConfig(length, endTimestamp);

  startAnimation(timeConfig, endTimestamp);
};

setTimeout(() => {
  const durationMs = 6 * 1000;

  startTitleAnimation(durationMs);
  setInterval(startTitleAnimation, 9 * 1000, durationMs);
}, 3000);

// THEME SWITCHER

const themeButton = document.getElementById("theme-button");
const root = document.querySelector(":root");

const themes = {
  neonNight: {
    background: "#0d0d0d",
    primary: "#ff1493",
    secondary: "#c29de3",
    onBackground: "#39ff14",
    onPrimary: "#cccccc",
    onSecondary: "#cccccc",
  },
  redVelvet: {
    background: "#880000",
    primary: "#499f21",
    secondary: "#c9a470",
    onBackground: "#f9e4d2",
    onPrimary: "#bd2338",
    onSecondary: "#bd2338",
  },
  sepia: {
    background: "#d6a543",
    primary: "#d5cec9",
    secondary: "#6a8a3b",
    onBackground: "#8a4a26",
    onPrimary: "#468faa",
    onSecondary: "#468faa",
  },
  bubbleGum: {
    background: "#ff6ec7",
    primary: "#a0e7ff",
    secondary: "#fff44f",
    onBackground: "#ffffff",
    onPrimary: "#633b20",
    onSecondary: "#633b20",
  },
};

let index = 0;
const arr = [themes.neonNight, themes.redVelvet, themes.sepia, themes.bubbleGum];
const titles = ["Neon Night", "Red Velvet", "Mexico Sepia", "Bubble Gum"];

const changeColorScheme = () => {
  index = index === arr.length - 1 ? 0 : index + 1;

  const theme = arr[index];

  themeButton.textContent = titles[index];

  root.style.setProperty("--color-background", theme.background);
  root.style.setProperty("--color-primary", theme.primary);
  root.style.setProperty("--color-secondary", theme.secondary);
  root.style.setProperty("--color-on-background", theme.onBackground);
  root.style.setProperty("--color-on-primary", theme.onPrimary);
  root.style.setProperty("--color-on-secondary", theme.onSecondary);
};

themeButton.addEventListener("click", changeColorScheme);
