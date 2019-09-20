import Util from './utils.js';
import render from './render.js';
import { picturesData } from './picture.js';

const imgFilters = document.querySelector('.img-filters');
const btnPopular = imgFilters.querySelector('#filter-popular');
const btnNew = imgFilters.querySelector('#filter-new');
const btnDiscussed = imgFilters.querySelector('#filter-discussed');
const picturesContainer = document.querySelector('.pictures');
const NEW_AMOUNT = 12;

const removePictures = () => {
    for (let i = 0; i < 5; i++) {
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

const sortPopular = () => {
    removePictures();
    renderPictures(picturesData);
};

const sortNew = function() {
    removePictures();
    const filterNewArr = Util.getRandomUniqueArrayElements(picturesData, NEW_AMOUNT);
    renderPictures(filterNewArr);
}

const sortDiscussed = () => {

};

btnPopular.addEventListener ('click', sortPopular);
btnNew.addEventListener ('click', sortNew);
btnDiscussed.addEventListener ('click', sortDiscussed);