const sections = document.querySelectorAll(".section");

const bg1 = document.getElementById("bg1");
const bg2 = document.getElementById("bg2");

let currentBg = bg1;
let nextBg = bg2;
let current = "";

/* 🔥 初期（これ超重要） */
window.addEventListener("DOMContentLoaded", () => {
  if(sections.length > 0){
    const firstBg = sections[0].dataset.bg;

    bg1.style.backgroundImage = `url(${firstBg})`;
    bg1.classList.add("active");
    current = firstBg;

    sections[0].classList.add("active");
  }
});

/* 背景変更 */
function changeBg(url){
  nextBg.style.backgroundImage = `url(${url})`;
  nextBg.classList.add("active");

  currentBg.classList.remove("active");

  [currentBg, nextBg] = [nextBg, currentBg];
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
