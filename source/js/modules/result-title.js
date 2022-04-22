export default () => {
  const resultTitle = document.querySelectorAll(`.result__title`);
  [...resultTitle].forEach((it) => {
    const letter = it.querySelectorAll(`path`);
    letter.forEach((el) => {
      const pathLength = el.getTotalLength();
      const dashArrStart = [0, pathLength / 2, 0, pathLength / 2];
      const dashArrFinish = [pathLength / 2, 0, pathLength / 2, 0];
      el.style.setProperty(`--arrStart`, dashArrStart);
      el.style.setProperty(`--arrFinish`, dashArrFinish);
    });
  });
};
