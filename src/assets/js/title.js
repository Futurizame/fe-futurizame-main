const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const randomLetter = () => {
  return LETTERS[Math.floor(Math.random() * LETTERS.length)];
};

const i01 = document.getElementById("i01");
const i02 = document.getElementById("i02");
const i03 = document.getElementById("i03");
const i04 = document.getElementById("i04");
const i05 = document.getElementById("i05");
const i06 = document.getElementById("i06");
const i07 = document.getElementById("i07");
const i08 = document.getElementById("i08");
const i09 = document.getElementById("i09");
const i10 = document.getElementById("i10");

const arr = [i01, i02, i03, i04, i05, i06, i07, i08, i09, i10];
const originalLetters = arr.reduce((res, ele) => {
  res[ele.id] = ele.textContent;
  return res;
}, {});

const initRandomLetterAnimation = (ele, endTimestamp) => {
  const intervalId = setInterval(() => {
    if (Date.now() >= endTimestamp) {
      clearInterval(intervalId);
      ele.textContent = originalLetters[ele.id];

      return;
    }

    ele.textContent = randomLetter();
  }, 100);
};

const startTitleAnimation = (durationMs) => {
  const startTimestamp = Date.now();

  const length = arr.length;
  arr.forEach((ele, index) => {
    const deltaMs = (length - (index + 1)) * 400;

    const endTimestamp = startTimestamp + durationMs - deltaMs;

    initRandomLetterAnimation(ele, endTimestamp);
  });
};

setTimeout(() => {
  const durationMs = 7 * 1000;

  startTitleAnimation(durationMs);
  setInterval(startTitleAnimation, 9 * 1000, durationMs);
}, 2000);
