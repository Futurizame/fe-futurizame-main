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
