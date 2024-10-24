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

const initRandomLetterAnimation = (ele, originalLetter, endTimestamp) => {
  const intervalId = setInterval(() => {
    ele.textContent = randomLetter();

    if (Date.now() >= endTimestamp) {
      clearInterval(intervalId);
      ele.textContent = originalLetter;
    }
  }, 80);
};

const startTitleAnimation = (durationMs) => {
  const startTimestamp = Date.now();

  const length = arr.length;
  arr.forEach((ele, index) => {
    const deltaMs = (length - (index + 1)) * 500;
    const originalLetter = ele.textContent;

    const endTimestamp = startTimestamp + durationMs - deltaMs;

    initRandomLetterAnimation(ele, originalLetter, endTimestamp);
  });
};

setTimeout(() => {
  const durationMs = 8 * 1000;

  startTitleAnimation(durationMs);
  setInterval(startTitleAnimation, 10 * 1000, durationMs);
}, 2000);
