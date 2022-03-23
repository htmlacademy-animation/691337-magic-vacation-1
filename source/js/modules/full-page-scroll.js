import throttle from 'lodash/throttle';

export default class FullPageScroll {
  constructor() {
    this.THROTTLE_TIMEOUT = 1000;
    this.scrollFlag = true;
    this.timeout = null;

    this.screenElements = document.querySelectorAll(`.screen:not(.screen--result)`);
    this.menuElements = document.querySelectorAll(`.page-header__menu .js-menu-link`);

    this.activeScreen = 0;
    this.previousScreen = -1;
    this.onScrollHandler = this.onScroll.bind(this);
    this.onUrlHashChengedHandler = this.onUrlHashChanged.bind(this);
  }

  init() {
    document.addEventListener(`wheel`, throttle(this.onScrollHandler, this.THROTTLE_TIMEOUT, {trailing: true}));
    window.addEventListener(`popstate`, this.onUrlHashChengedHandler);

    this.onUrlHashChanged();
  }

  onScroll(evt) {
    if (this.scrollFlag) {
      this.reCalculateActiveScreenPosition(evt.deltaY);
      const currentPosition = this.activeScreen;
      if (currentPosition !== this.activeScreen) {
        this.changePageDisplay();
      }
    }
    this.scrollFlag = false;
    if (this.timeout !== null) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.scrollFlag = true;
    }, this.THROTTLE_TIMEOUT);
  }

  onUrlHashChanged() {
    const newIndex = Array.from(this.screenElements).findIndex((screen) => location.hash.slice(1) === screen.id);
    this.previousScreen = this.activeScreen;
    this.activeScreen = (newIndex < 0) ? 0 : newIndex;
    this.changePageDisplay();
  }

  changePageDisplay() {
    this.changeVisibilityDisplay();
    this.changeActiveMenuItem();
    this.emitChangeDisplayEvent();
    this.loadPrizesSvg();
  }

  changeVisibilityDisplay() {
    const isCoverCase = this.screenElements[this.previousScreen].id === `story` &&
      this.screenElements[this.activeScreen].id === `prizes`;

    const hideScreen = (it) => {
      it.classList.add(`screen--hidden`);
      it.classList.remove(`active`);
    };

    const hideCoveredScreen = (it) => {
      it.classList.add(`screen--cover`);
      it.classList.remove(`active`);
      setTimeout(() => {
        it.classList.remove(`screen--cover`);
        it.classList.add(`screen--hidden`);
      }, 300);
    };

    this.screenElements.forEach((screen, index) => {
      if (isCoverCase && index === this.previousScreen) {
        hideCoveredScreen(screen);
      } else {
        hideScreen(screen);
      }
    });

    if (isCoverCase) {
      setTimeout(() => this.screenElements[this.activeScreen]
      .classList.remove(`screen--hidden`), 300);
    } else {
      this.screenElements[this.activeScreen].classList.remove(`screen--hidden`);
    }

    setTimeout(() => {
      this.screenElements[this.activeScreen].classList.add(`active`);
    }, 100);
  }

  loadPrizesSvg() {
    const isPrizesScreen = this.screenElements[this.activeScreen].id === `prizes`;
    if (isPrizesScreen) {
      const firstPrize = document.querySelector(`.prizes__item--journeys`);
      const firstPrizeIcon = firstPrize.querySelector(`.prizes__icon`);
      if (!firstPrizeIcon.querySelector(`object`)) {
        const element = document.createElement(`object`);
        element.setAttribute(`type`, `image/svg+xml`);
        element.setAttribute(`data`, `../../img/prize1-animate.svg`);
        firstPrizeIcon.appendChild(element);
        return firstPrizeIcon;
      } else {
        return ``;
      }
    } else {
      return ``;
    }
  }

  changeActiveMenuItem() {
    const activeItem = Array.from(this.menuElements).find((item) => item.dataset.href === this.screenElements[this.activeScreen].id);
    if (activeItem) {
      this.menuElements.forEach((item) => item.classList.remove(`active`));
      activeItem.classList.add(`active`);
    }
  }

  emitChangeDisplayEvent() {
    const event = new CustomEvent(`screenChanged`, {
      detail: {
        'screenId': this.activeScreen,
        'screenName': this.screenElements[this.activeScreen].id,
        'screenElement': this.screenElements[this.activeScreen]
      }
    });

    document.body.dispatchEvent(event);
  }

  reCalculateActiveScreenPosition(delta) {
    if (delta > 0) {
      this.activeScreen = Math.min(this.screenElements.length - 1, ++this.activeScreen);
    } else {
      this.activeScreen = Math.max(0, --this.activeScreen);
    }
  }
}
