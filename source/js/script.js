// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import load from './modules/load.js';
import AccentTypography from './modules/accent-typography.js';
import StoryScreen from './modules/story-screen.js';
import resultTitle from './modules/result-title.js';

// init modules
load();
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
resultTitle();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

const accentTypography = new AccentTypography();
accentTypography.init();

const storyScreen = new StoryScreen();
storyScreen.init();
