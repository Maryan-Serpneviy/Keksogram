import Const from './constants.js';
import Util from './utils.js';
import render from './render.js';
import { picturesData } from './picture.js';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const imgFiltersBtns = imgFiltersForm.querySelectorAll('.img-filters__button');
const picturesContainer = document.querySelector('.pictures')
const MAGIC_NUMBER = 5;
let picturesToFilter = new Array();

const removePictures = () => {
    for (let i = 0; i < MAGIC_NUMBER; i++) {
        Array.prototype.forEach.call(picturesContainer.childNodes, element => {
            if (element.className === 'picture__link') {
                element.remove();
            }
        });
    }
};

const renderPictures = () => {
    removePictures();
    const fragment = document.createDocumentFragment();
    picturesToFilter.forEach(element => {
        fragment.appendChild(render(element));
    });
    picturesContainer.appendChild(fragment);
};

const filterSwitchHandler = evt => {
    const targetBtn = evt.target.textContent.toLowerCase();
    Array.prototype.forEach.call(imgFiltersBtns, element => {
        element.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
    switch(targetBtn) {
        case 'new':
            picturesToFilter = picturesData.getRandomUniques(Const.NEW_AMOUNT);
            break;
        case 'discussed':
            picturesToFilter = Array.from(picturesData).sort((prev, next) => next.comments.length - prev.comments.length);
            break;
        default:
            picturesToFilter = picturesData;
    }
    Util.debounce(renderPictures, Const.TIMEOUT.DEBOUNCE);
};

imgFiltersForm.addEventListener ('click', filterSwitchHandler);