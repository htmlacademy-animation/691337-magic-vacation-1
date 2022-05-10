export default class PrizesScreen {
  constructor() {
    this.screen = document.querySelector(`.screen--prizes`);
    this.prizesElements = document.querySelectorAll(`.prizes__desc`);
    this.active = 0;
    //this.startTime = 0;
    this.ANIM_DELAY = 3200;
    this.DURATION = 500;

    this.onUrlHashChanged = this.onUrlHashChanged.bind(this);
  }

  init() {
    window.addEventListener(`hashchange`, this.onUrlHashChanged);
    this.onUrlHashChanged();
  }

  onUrlHashChanged() {
    const isPrizesScreenActive = location.hash.slice(1) === `prizes`;

    if (isPrizesScreenActive) {
      this.active = 1;
      this.startAnimation();
      //const children = [...this.prizesElements].map((it) => Array.from(it.children));
    } else {
      if (this.active) {
        this.active = 0;
      }
    }
  }

  startAnimation() {
    const showStartElement = document.querySelector(`#show`);
    if (showStartElement) {
      showStartElement.beginElement();
      this.animateDescText();
      //this.startTime = Date.now();
      setTimeout(() => {
        showStartElement.removeAttribute(`id`);
      }, 10000);
    }
  }

  animateDescText() {
    [...this.prizesElements].forEach((it, index) => {
      const text = it.querySelector(`span`);
      text.style.opacity = 0;
      const delayElement = this.ANIM_DELAY * (index + 1);
      text.animate({
        opacity: [0, 1],
        transform: [`translateX(3rem)`, `translateX(0)`]
      }, {
        duration: this.DURATION,
        delay: delayElement,
        fill: `forwards`
      });
    });
  }
}
