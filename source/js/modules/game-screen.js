export default class GameScreen {
  constructor() {
    this.screen = document.querySelector(`.screen--game`);
    this.counter = document.querySelector(`.game__counter`);
    this.MAX_TIME = 5 * 60;
    this.MS = 1000;
    this.SEC = 60;
    this.LIMIT = 10;
    this.DELAY = 1200;

    this.onUrlHashChanged = this.onUrlHashChanged.bind(this);
  }

  init() {
    window.addEventListener(`hashchange`, this.onUrlHashChanged);
    this.onUrlHashChanged();
  }

  onUrlHashChanged() {
    const isGameScreenActive = location.hash.slice(1) === `game`;
    if (isGameScreenActive) {
      setTimeout(() => {
        this.startTimer();
      }, this.DELAY);
    }
  }

  draw(timePassed) {
    const counterElements = this.counter.querySelectorAll(`span`);
    const [minute, second] = [...counterElements];
    minute.textContent = `0${Math.floor(timePassed / this.SEC)}`;
    second.textContent = Math.floor(timePassed % this.SEC) < this.LIMIT ?
      `0${Math.floor(timePassed % this.SEC)}` : Math.floor(timePassed % this.SEC);
  }

  startTimer() {
    let start = performance.now();

    requestAnimationFrame(() => {
      let timer = setInterval(() => {
        let timePassed = (performance.now() - start) / this.MS;

        if (timePassed > this.MAX_TIME) {
          clearInterval(timer);
        }

        this.draw(timePassed);
      }, this.MS);
    });
  }
}
