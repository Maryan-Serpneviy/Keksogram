import Const from './constants.js';
import Util from './utils.js';
import render from './render.js';
import { picturesData } from './picture.js';

const imgFilters = document.querySelector('.img-filters');
const imgFiltersForm = imgFilters.querySelector('.img-filters__form');
const imgFiltersBtns = imgFiltersForm.querySelectorAll('.img-filters__button');
const btnPopular = imgFilters.querySelector('#filter-popular');
const btnNew = imgFilters.querySelector('#filter-new');
const btnDiscussed = imgFilters.querySelector('#filter-discussed');
const picturesContainer = document.querySelector('.pictures')
const MAGIC_NUMBER = 5;

const removePictures = () => {
    for (let i = 0; i < MAGIC_NUMBER; i++) {
        Array.prototype.forEach.call(picturesContainer.childNodes, element => {
            if (element.className === 'picture__link') {
                element.remove();
            }
        });
    }
};

const renderPictures = data => {
    const fragment = document.createDocumentFragment();
    data.forEach(element => {
        fragment.appendChild(render(element));
    });
    picturesContainer.appendChild(fragment);
};

const switchButton = evt => {
    Array.prototype.forEach.call(imgFiltersBtns, element => {
        element.classList.remove('img-filters__button--active');
    });
    evt.target.classList.add('img-filters__button--active');
}

const sortPopular = () => {
    removePictures();
    renderPictures(picturesData);
};

const sortNew = () => {
    removePictures();
    const filterNewArr = Util.getRandomUniqueArrayElements(picturesData, Const.NEW_AMOUNT);
    renderPictures(filterNewArr);
}

const sortDiscussed = () => {
    removePictures();
    const filterDiscussedArr = Array.from(picturesData).sort((prev, next) => next.comments.length - prev.comments.length);
    renderPictures(filterDiscussedArr);
};

imgFiltersForm.addEventListener ('click', switchButton);
btnPopular.addEventListener ('click', sortPopular);
btnNew.addEventListener ('click', sortNew);
btnDiscussed.addEventListener ('click', sortDiscussed);