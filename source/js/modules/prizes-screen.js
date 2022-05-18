export default class PrizesScreen {
  constructor() {
    this.prizesElements = document.querySelectorAll(`.prizes__desc`);
    this.ANIM_DELAY = 3300;
    this.DURATION = 500;
    this.INTERVAL = 83;
    this.MAX_COUNTER = 7;

    this.onUrlHashChanged = this.onUrlHashChanged.bind(this);
  }

  init() {
    window.addEventListener(`hashchange`, this.onUrlHashChanged);
    this.onUrlHashChanged();
  }

  onUrlHashChanged() {
    const isPrizesScreenActive = location.hash.slice(1) === `prizes`;

    if (isPrizesScreenActive) {
      this.startAnimation();
    }
  }

  startAnimation() {
    const showStartElement = document.querySelector(`#show`);
    if (showStartElement) {
      showStartElement.beginElement();
      this.animatePrizesDesc();
      setTimeout(() => {
        showStartElement.removeAttribute(`id`);
      }, 10000);
    }
  }

  animatePrizesDesc() {
    [...this.prizesElements].forEach((it, index) => {
      const text = it.querySelector(`span`);
      const amount = it.querySelector(`b`);
      amount.style.opacity = 0;
      text.style.opacity = 0;
      const delayElement = this.ANIM_DELAY * (index + 1);
      amount.animate({
        opacity: [0, 1]
      }, {
        duration: this.DURATION,
        delay: delayElement,
        fill: `forwards`
      });
      text.animate({
        opacity: [0, 1],
        transform: [`translateX(3rem)`, `translateX(0)`]
      }, {
        duration: this.DURATION,
        delay: delayElement,
        fill: `forwards`
      });

      switch (index) {
        case 0:
          it.style.transform = `translateX(10rem)`;
          it.animate({
            transform: [`translateX(10rem)`, `translateX(-9rem)`]
          }, {
            duration: 1000,
            delay: 4600,
            fill: `forwards`
          });
          break;
        case 1:
          it.style.transform = `translateX(-3rem)`;
          setTimeout(() => {
            const args = [amount, 7, 1, 1];
            requestAnimationFrame(this.startTimer.bind(this, ...args));
          }, delayElement);
          break;
        case 2:
          amount.style.minWidth = `18.7rem`;
          setTimeout(() => {
            const args = [amount, 900, 11, this.getRandomInt(0, 150)];
            requestAnimationFrame(this.startTimer.bind(this, ...args));
          }, delayElement);
          break;
        default:
          break;
      }
    });
  }

  startTimer(element, maxAmount, startValue, step) {
    let start = startValue;
    let counter = 0;

    let timer = setInterval(() => {
      let value = start + step;
      start = value;
      counter += 1;

      if (counter === this.MAX_COUNTER) {
        element.textContent = maxAmount;
        clearInterval(timer);
      } else {
        element.textContent = value;
      }
    }, this.INTERVAL);
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
