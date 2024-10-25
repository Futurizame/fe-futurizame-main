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

const elementsLetter = [
  { element: i01, letter: "F" },
  { element: i02, letter: "u" },
  { element: i03, letter: "t" },
  { element: i04, letter: "u" },
  { element: i05, letter: "r" },
  { element: i06, letter: "i" },
  { element: i07, letter: "z" },
  { element: i08, letter: "a" },
  { element: i09, letter: "M" },
  { element: i10, letter: "e" },
];

const initRandomLetterAnimation = (ele, letter, endTimestamp) => {
  const intervalId = setInterval(() => {
    if (Date.now() >= endTimestamp) {
      clearInterval(intervalId);
      ele.textContent = letter;

      return;
    }

    ele.textContent = randomLetter();
  }, 100);
};

const startTitleAnimation = (durationMs) => {
  const startTimestamp = Date.now();

  const length = elementsLetter.length;

  elementsLetter.forEach(({ element, letter }, index) => {
    const deltaMs = (length - (index + 1)) * 400;

    const endTimestamp = startTimestamp + durationMs - deltaMs;

    initRandomLetterAnimation(element, letter, endTimestamp);
  });
};

setTimeout(() => {
  const durationMs = 6 * 1000;

  startTitleAnimation(durationMs);
  setInterval(startTitleAnimation, 9 * 1000, durationMs);
}, 3000);
