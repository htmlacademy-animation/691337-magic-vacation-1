import {ACCENT_TYPOGRAPHY_SELECTORS} from './constants';

export default class AccentTypography {
  constructor() {
    this.DURATION = 1000;
    this.TIME_STEP = 40;
    this.DELAY = 300;
    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.previousScreen = -1;
    this.activeScreen = 0;
    this.onUrlHashChanged = this.onUrlHashChanged.bind(this);
  }

  init() {
    window.addEventListener(`hashchange`, this.onUrlHashChanged);
    this.prepareAnimation();
    this.onUrlHashChanged();
  }

  onUrlHashChanged() {
    const activeScreenIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.previousScreen = this.activeScreen;
    this.activeScreen = (activeScreenIndex < 0) ? 0 : activeScreenIndex;
    this.activateAnimation();
  }

  createLetterElement(letter, index, order, property, timer, orderIndex) {
    const container = document.createElement(`span`);
    container.textContent = letter;
    if (letter === ` `) {
      container.style.marginLeft = `5px`;
    }
    const timeOffset = order[orderIndex][index] * this.TIME_STEP + this.DELAY * orderIndex;
    container.style.transition = `${property} ${timer}ms ease ${timeOffset}ms`;
    return container;
  }

  prepareText(selector, timer, property, order, split) {
    const element = document.querySelector(selector);
    const text = split ? element.textContent.split(` `) : element.textContent.split();
    const content = text.reduce((acc, it, orderIndex) => {
      const lettersList = it.split(``).reduce((fragment, el, index) => {
        fragment.appendChild(this.createLetterElement(el, index, order, property, timer, orderIndex));
        return fragment;
      }, document.createDocumentFragment());
      const stringContainer = document.createElement(`span`);
      stringContainer.classList.add(`text__string`);
      stringContainer.appendChild(lettersList);
      acc.appendChild(stringContainer);
      return acc;
    }, document.createDocumentFragment());

    element.innerHTML = ``;
    element.appendChild(content);
  }

  prepareAnimation() {
    ACCENT_TYPOGRAPHY_SELECTORS.forEach((it) => {
      this.prepareText(it.selector, this.DURATION, `transform`, it.elementsOrder, it.isToSplit);
    });
  }

  activateAnimation() {
    ACCENT_TYPOGRAPHY_SELECTORS.forEach((it) => {
      const isToActivate = this.screenElements[this.activeScreen].querySelector(it.selector) !== null;
      const element = document.querySelector(it.selector);

      if (isToActivate) {
        setTimeout(() => {
          element.classList.add(`accent-typography--active`);
        }, it.delay);
      } else {
        element.classList.remove(`accent-typography--active`);
      }
    });
  }
}
