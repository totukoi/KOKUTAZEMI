/* メニュー */
function toggleMenu(){
  document.getElementById("menu").classList.toggle("active");
}

const sections = document.querySelectorAll(".section");
const bg = document.getElementById("bg");

let current = "";

/* 初期 */
window.addEventListener("load", () => {
  if(sections.length > 0){
    const first = sections[0];
    const firstBg = first.dataset.bg;

    bg.style.backgroundImage = `url(${firstBg})`;
    current = firstBg;

    first.classList.add("active"); // 最初の文字表示
  }

  document.getElementById("transition").style.opacity = "0";
});

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

  /* active切り替え（文字表示制御） */
  sections.forEach(section => {
    section.classList.remove("active");
  });

  if(closest){
    closest.classList.add("active");

    const newBg = closest.dataset.bg;

    if(current !== newBg){
      current = newBg;

      bg.style.opacity = "0";

      setTimeout(() => {
        bg.style.backgroundImage = `url(${newBg})`;
        bg.style.opacity = "1";
      }, 400);
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
