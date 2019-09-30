import Const from './constants.js';
import Util from './utils.js';
import render from './render.js';
import Picture from './picture.js';
import { Pictures } from './gallery.js';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const imgFiltersBtns = imgFiltersForm.querySelectorAll('.img-filters__button');
const picturesContainer = document.querySelector('.pictures');
let picturesToFilter = new Array();

const renderPictures = () => {
    Picture.removePictures();
    const fragment = document.createDocumentFragment();
    picturesToFilter.forEach(element => {
        fragment.appendChild(render(element));
    });
    picturesContainer.appendChild(fragment);
};

const filterSwitchHandler = evt => {
    const targetBtn = evt.target.textContent.toLowerCase();
    Array.prototype.forEach.call(imgFiltersBtns, button => {
        button.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    switch(targetBtn) {
        case 'new':
            picturesToFilter = Pictures.getRandomUniques(Const.NEW_AMOUNT);
            break;
        case 'discussed':
            picturesToFilter = Array.from(Pictures).sort((prev, next) => next.comments.length - prev.comments.length);
            break;
        default:
            picturesToFilter = Pictures;
    }
    Util.debounce(renderPictures, Const.TIMEOUT.DEBOUNCE);
};

imgFiltersForm.addEventListener('click', filterSwitchHandler);