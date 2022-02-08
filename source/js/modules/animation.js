export const animationTitleText = (selector, timer, property) => {
  let timeOffset = 0;
  const element = document.querySelector(`.${selector}`);
  const text = element.textContent.split(` `);

  const createLetterElement = (letter) => {
    const container = document.createElement(`span`);
    container.textContent = letter;
    container.style.transition = `${property} ${timer}ms ease ${timeOffset}ms`;
    timeOffset += 50;
    return container;
  };

  const content = text.reduce((acc, it) => {
    const lettersList = it.split(``).reduce((fragment, el) => {
      fragment.appendChild(createLetterElement(el));
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
  return element;
};
