export default () => {
  let pageBody = document.querySelector(`body`);
  window.addEventListener(`load`, function () {
    pageBody.classList.add(`loaded`);
  });
};
