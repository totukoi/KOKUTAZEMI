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

/* ■ スクロール処理 */
window.addEventListener("scroll", () => {

  let closest = null;
  let min = Infinity;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();

    /* 背景切り替え（中央基準） */
    const center = Math.abs(
      rect.top + rect.height / 2 - window.innerHeight / 2
    );

    if(center < min){
      min = center;
      closest = section;
    }

    /* 🔥 フェードアウト（遅く発動） */
    const h1 = section.querySelector("h1");

    if(rect.bottom < window.innerHeight * 0.3){
      h1.classList.add("fade-out");
    }else{
      h1.classList.remove("fade-out");
    }
  });

  /* 背景変更 */
  if(closest){
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
