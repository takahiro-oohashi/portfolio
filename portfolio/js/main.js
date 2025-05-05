window.addEventListener("load", () => {
  // 1) ナビアイテムを左から順にフェード＆スライドイン
  gsap.fromTo(
    ".nav-list li",
    { opacity: 0, x: -100 },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15,  
      delay: 0.2     
    }
  )
});

// メインビジュアル：散らし → 整列アニメーション
window.addEventListener("load", () => {
  const imgs = document.querySelectorAll(".hero-grid img");
  const line = document.querySelector(".hero-line");
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
  tl
  .to(imgs, {
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
  })


// 3) ラインをスーッと伸ばす
  .to(line, {
    width:    "90%",
    duration: 0.6,
    ease:     "power2.out"
  }, "-=0.3")

// 4) キャッチコピー
  .fromTo(".hero-title", { y:-30, opacity:0 }, { y:0, opacity:1, duration:0.6 }, "-=0.2")

// 5) サブテキスト
  .fromTo(".hero-subtext", { y:30, opacity:0 }, { y:0, opacity:1, duration:0.6 }, "-=0.4")

// 6) ボタン
  .fromTo(".btn", { x:-20, opacity:0 }, { x:0, opacity:1, duration:0.5 }, "-=0.4")

  .fromTo(".hero-surprise",
    { scale: 0, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "bounce.out"
    },
    "+=0.4" 
  )

   // 4) 「信頼」をポップに強調（追加）
   .fromTo(
    ".emphasis.trust .emphasis-bg",
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: "back.out(1.7)"
    },
    "<"  // サプライズロゴと同タイミング
  )
 // ←ここにホバー登録をフック！
 .eventCallback("onComplete", () => {
  imgs.forEach(img => {
    const hoverTween = gsap.to(img, {
      keyframes: [
        { rotation: -5, duration: 0.5 },
        { rotation: 5,  duration: 0.5 }
      ],
      x:        0,
      y:        10,
      ease:     "sine.inOut",
      yoyo:     true,
      repeat:   -1,
      paused:   true
    });
    img.addEventListener("mouseenter", () => hoverTween.play());
    img.addEventListener("mouseleave", () => {
      hoverTween.pause(0);
      gsap.to(img, { rotation:0, x:0, y:0, duration:0.3, ease:"power2.out" });
    });
  });


});
});