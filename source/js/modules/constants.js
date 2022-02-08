export const COMMON_ORDER = [3, 1, 0, 1, 2, 1, 0, 4, 2, 0, 2, 0];
export const RULES_ORDER = [4, 2, 1, 0, 3, 2, 0];
export const INTRO_ORDER = [3, 4, 2, 0, 3, 1];
export const DATE_ORDER = [3, 2, 0, 2, 0, 4, 1, 5, 2, 5, 0, 2, 0, 0, 4, 3, 1];

export const ACCENT_TYPOGRAPHY_SELECTORS = [
  {
    selector: `.intro__title`,
    elementsOrder: [COMMON_ORDER, INTRO_ORDER],
    delay: 700,
    isToSplit: true,
  },
  {
    selector: `.intro__date`,
    elementsOrder: [DATE_ORDER],
    delay: 2100,
    isToSplit: false,
  },
  {
    selector: `.slider__item-title`,
    elementsOrder: [COMMON_ORDER],
    delay: 500,
    isToSplit: false,
  },
  {
    selector: `.prizes__title`,
    elementsOrder: [COMMON_ORDER],
    delay: 400,
    isToSplit: false,
  },
  {
    selector: `.rules__title`,
    elementsOrder: [RULES_ORDER],
    delay: 200,
    isToSplit: false,
  },
  {
    selector: `.game__title`,
    elementsOrder: [COMMON_ORDER],
    delay: 200,
    isToSplit: false
  },
];


