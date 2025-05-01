// メインビジュアル：散らし → 整列アニメーション
window.addEventListener("load", () => {
  const imgs = document.querySelectorAll(".hero-grid img");

  // 初期：ランダムにバラまく
  gsap.set(imgs, {
    x: () => (Math.random() - 0.5) * 300,
    y: () => (Math.random() - 0.5) * 300,
    rotation: () => (Math.random() - 0.5) * 60,
    opacity: 0.2,
    scale: 0.8,
    transformOrigin: "center center"
  });

  // 整列：CSS Grid の位置 (translate 0,0) へ戻す
  const tl = gsap.timeline({ delay: 0.5 });
  tl.to(imgs, {
    x:      0,
    y:      0,
    rotation: 0,
    opacity:  1,
    scale:    1,
    duration: 0.8,
    ease:     "power2.out",
    stagger:  0.1
  })
  // ポン！と弾む
  .to(imgs, {
    scale:   1.05,
    duration:0.2,
    yoyo:     true,
    repeat:   1
  });
});
