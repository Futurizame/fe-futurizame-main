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
  setInterval(initTypingAnimation, 7000);
}, 1000);
