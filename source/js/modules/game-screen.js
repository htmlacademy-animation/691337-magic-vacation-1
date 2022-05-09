export default class GameScreen {
  constructor() {
    this.screen = document.querySelector(`.screen--game`);
    this.counterElements = document.querySelector(`.game__counter`).querySelectorAll(`span`);
    this.active = 0;
    this.MAX_TIME = 5 * 60 + 1;
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
      [...this.counterElements][0].textContent = `05`;
      [...this.counterElements][1].textContent = `00`;
      setTimeout(() => {
        requestAnimationFrame(this.startTimer);
      }, this.DELAY);
    } else {
      if (this.active) {
        this.active = 0;
      }
    }
  }

  draw(timeLeft) {
    const [minute, second] = [...this.counterElements];
    minute.textContent = `0${Math.floor(timeLeft / this.SEC)}`;
    second.textContent = Math.floor(timeLeft % this.SEC) < this.LIMIT ?
      `0${Math.floor(timeLeft % this.SEC)}` : Math.floor(timeLeft % this.SEC);
  }

  startTimer() {
    let start = Date.now();
    let timer = setInterval(() => {
      let timeLeft = this.MAX_TIME - (Date.now() - start) / this.MS;

      if (timeLeft <= 1 || this.active === 0) {
        clearInterval(timer);
      }

      this.draw(timeLeft);
    }, this.MS);
  }
}
