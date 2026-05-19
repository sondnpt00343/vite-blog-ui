export const initSlider = () => {
  const selector = ".hero-slider";
  if (!document.querySelector(selector)) return;

  new Slidezy(selector, {
    items: 1,
    speed: 300,
    loop: true,
    nav: true,
    controls: false,
    controlsText: ["<", ">"],
    prevButton: null,
    nextButton: null,
    slideBy: 1,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
  });
};
