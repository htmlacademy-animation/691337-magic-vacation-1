export default class GameScreen {
  constructor() {
    this.screen = document.querySelector(`.screen--game`);
    this.counterElements = document.querySelector(`.game__counter`).querySelectorAll(`span`);
    this.active = 0;
    this.MAX_TIME = 5 * 60;
    this.MS = 1000;
    this.SEC = 60;
    this.LIMIT = 10;
    this.DELAY = 1200;

    this.onUrlHashChanged = this.onUrlHashChanged.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  init() {
    window.addEventListener(`hashchange`, this.onUrlHashChanged);
    this.onUrlHashChanged();
  }

  onUrlHashChanged() {
    const isGameScreenActive = location.hash.slice(1) === `game`;

    if (isGameScreenActive) {
      this.active = 1;
      [...this.counterElements].forEach((it) => {
        it.textContent = `00`;
      });
      setTimeout(() => {
        requestAnimationFrame(this.startTimer);
      }, this.DELAY);
    } else {
      if (this.active) {
        this.active = 0;
      }
    }
  }

  draw(timePassed) {
    const [minute, second] = [...this.counterElements];
    minute.textContent = `0${Math.floor(timePassed / this.SEC)}`;
    second.textContent = Math.floor(timePassed % this.SEC) < this.LIMIT ?
      `0${Math.floor(timePassed % this.SEC)}` : Math.floor(timePassed % this.SEC);
  }

  startTimer() {
    let start = Date.now();
    let timer = setInterval(() => {
      let timePassed = (Date.now() - start) / this.MS;

      if (timePassed > this.MAX_TIME || this.active === 0) {
        clearInterval(timer);
      }

      this.draw(timePassed);
    }, this.MS);
  }
}
