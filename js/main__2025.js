let colun = document.querySelectorAll(".colun");

document.addEventListener("click", (event) => {
  let eventType = event.target.dataset.type;

  if (eventType === "clickIkon") {
    let icon =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : document.querySelector("i");

    icon.classList.toggle("fa-lock-open");
    icon.classList.toggle("fa-lock");
  } else if (eventType === "clickText") {
    copyText(event.target.textContent);
  }
});

function copyText(text) {
  return navigator.clipboard.writeText(text);
}

document.addEventListener('DOMContentLoaded',() => {
    colorGener();
    console.log('test reload')
})


let keydown = addEventListener("keydown", (event) => {
  if (event.code.toLowerCase() === "space") {
    event.preventDefault();
    colorGener();
  }


});

function randomGener() {
  let rgbA = "123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += rgbA[Math.floor(Math.random() * rgbA.length)];
  }
  return "#" + color;
}
randomGener();

function colorGener(isInitial) {
  let colors = isInitial ? getFunHash() : [];

  colun.forEach((item, index) => {
    let text = item.querySelector("h2");
    let btN = item.querySelector("button");

    let colorFun = isInitial
      ? colors[index]
        ? colors[index]
        : randomGener()
      : randomGener();

    if (!isInitial) {
      colors.push(colorFun);
    }

    let iconI = item.querySelector("i");

    if (iconI.classList.contains("fa-lock")) {
      colors.push(text.textContent);
      return;
    }
    colors.push(colorFun);

    text.textContent = colorFun;
    item.style.background = colorFun;
    chromaFun(text, colorFun);
    chromaFun(btN, colorFun);
  });
  funHash(colors);
}
colorGener(true);

function chromaFun(text, color) {
  let limunk = chroma(color).luminance();
  text.style.color = limunk > 0.5 ? "white" : "black";
}

function funHash(colors = []) {
  document.location.hash = colors
    .map((col) => {
      return col.toString().substring(1);
    })
    .join("-");
}

function getFunHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}
