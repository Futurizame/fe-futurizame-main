const themeButton = document.getElementById("theme-button");

const changeColorScheme = () => {
  const root = document.querySelector(":root");

  root.style.setProperty("--color-on-background", "239 242 19");
};

themeButton.addEventListener("click", changeColorScheme);
