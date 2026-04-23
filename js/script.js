
/* ■ メニュー開閉 */
function toggleMenu(){
  document.getElementById("menu").classList.toggle("active");
}

/* ■ スクロールで背景変化 */
window.addEventListener("scroll", () => {
  document.body.classList.toggle("scrolled", window.scrollY > 100);
});

/* ■ フェードイン */
window.addEventListener("load", () => {
  document.getElementById("transition").style.opacity = "0";
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