function toggleMenu(){
  document.getElementById("menu").classList.toggle("active");
}

const sections = document.querySelectorAll(".section");

const bg1 = document.getElementById("bg1");
const bg2 = document.getElementById("bg2");

let currentBg = bg1;
let nextBg = bg2;
let current = "";

/* 初期 */
window.addEventListener("load", () => {
  const first = sections[0];
  const firstBg = first.dataset.bg;

  currentBg.style.backgroundImage = `url(${firstBg})`;
  currentBg.classList.add("active");
  current = firstBg;

  first.classList.add("active");

  document.getElementById("transition").style.opacity = "0";
});

/* 背景変更 */
function changeBg(url){
  nextBg.style.backgroundImage = `url(${url})`;
  nextBg.classList.add("active");

  currentBg.classList.remove("active");

  let temp = currentBg;
  currentBg = nextBg;
  nextBg = temp;
}

/* スクロール */
window.addEventListener("scroll", () => {

  let closest = null;
  let min = Infinity;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();

    const center = Math.abs(
      rect.top + rect.height / 2 - window.innerHeight / 2
    );

    if(center < min){
      min = center;
      closest = section;
    }
  });

  /* 文字制御 */
  sections.forEach(section => {
    section.classList.remove("active");
  });

  if(closest){
    closest.classList.add("active");

    const newBg = closest.dataset.bg;

    if(current !== newBg){
      current = newBg;
      changeBg(newBg);
    }
  }
});

/* ページ遷移 */
document.querySelectorAll("a[href]").forEach(link => {
  link.addEventListener("click", function(e){
    const url = this.getAttribute("href");
    if(url.startsWith("http")) return;

    e.preventDefault();

    document.getElementById("transition").style.opacity = "1";

    setTimeout(() => {
      window.location.href = url;
    }, 400);
  });
});
