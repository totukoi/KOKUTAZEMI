/* ■ メニュー開閉 */
function toggleMenu(){
  document.getElementById("menu").classList.toggle("active");
}

/* ■ 背景切り替え */
const sections = document.querySelectorAll(".section");
const bg = document.getElementById("bg");

let current = "";

/* 初期背景 + フェードイン */
window.addEventListener("load", () => {
  if(sections.length > 0){
    const first = sections[0].dataset.bg;
    bg.style.backgroundImage = `url(${first})`;
    current = first;
  }

  document.getElementById("transition").style.opacity = "0";
});

/* スクロールで背景変更（中央基準） */
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

  if(closest){
    const newBg = closest.dataset.bg;

    if(current !== newBg){
      current = newBg;

      bg.style.opacity = "0";

      setTimeout(() => {
        bg.style.backgroundImage = `url(${newBg})`;
        bg.style.opacity = "1";
      }, 700); // ← フェードゆっくり
    }
  }
});

/* ■ ページ遷移アニメ */
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
