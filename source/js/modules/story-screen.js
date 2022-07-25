import SceneStory1 from './3d/scene-story-1';
import SceneStory2 from './3d/scene-story-2';
import SceneStory3 from './3d/scene-story-3';
import SceneStory4 from './3d/scene-story-4';

export default class StoryScreen {
  constructor() {
    this.body = document.querySelector(`body`);
    this.previousClass = ``;
    this.activeClass = `story-1`;
    this.sliderElements = document.querySelectorAll(`.swiper-slide`);
    this.controls = document.querySelectorAll(`.slider__control`);

    this.onUrlHashChanged = this.onUrlHashChanged.bind(this);
    this.addBodyClass = this.addBodyClass.bind(this);
    this.changeBodyClass = this.changeBodyClass.bind(this);
  }

  init() {
    window.addEventListener(`hashchange`, this.onUrlHashChanged);
    this.onUrlHashChanged();
  }

  onUrlHashChanged() {
    const isScreenStoryActive = location.hash.slice(1) === `story`;
    if (isScreenStoryActive) {
      this.addBodyClass();
    } else {
      this.removeBodyClass();
    }
  }

  addBodyClass() {
    this.body.classList.add(this.activeClass);
    this.addListeners();
  }

  changeBodyClass(evt) {
    evt.preventDefault();
    const currentIndex = Array.from(this.sliderElements).findIndex((it) => it.classList.contains(`swiper-slide-active`));
    this.previousClass = this.activeClass;
    switch (currentIndex) {
      case 0:
        this.activeClass = `story-1`;
        this.switchScene(SceneStory1);
        break;
      case 2:
        this.activeClass = `story-2`;
        this.switchScene(SceneStory2);
        break;
      case 4:
        this.activeClass = `story-3`;
        this.switchScene(SceneStory3);
        break;
      case 6:
        this.activeClass = `story-4`;
        this.switchScene(SceneStory4);
        break;
      default:
        this.activeClass = `story-1`;
    }

    this.body.classList.remove(this.previousClass);
    this.body.classList.add(this.activeClass);
  }

  switchScene(Scene) {
    const scene = new Scene();
    scene.init();
  }

  addListeners() {
    Array.from(this.controls).forEach((it) => {
      it.addEventListener(`click`, this.changeBodyClass);
    });
  }

  removeListeners() {
    Array.from(this.controls).forEach((it) => {
      it.removeEventListener(`click`, this.changeBodyClass);
    });
  }

  removeBodyClass() {
    this.body.classList.remove(this.activeClass);
    this.removeListeners();
  }
}
