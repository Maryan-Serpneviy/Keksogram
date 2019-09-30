import AJAX from './ajax.js';
import Picture from './picture.js';
import render from './render.js';

const picturesContainer = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');
const fragment = document.createDocumentFragment();

let Pictures = [];
Object.freeze(Pictures);

const renderPictures = data => {
    Pictures = data.map(picture => {
        return new Picture(picture);
    });
    data.shuffle();
    data.forEach(picture => {
        fragment.appendChild(render(new Picture(picture)));
    });
    picturesContainer.appendChild(fragment);
    imgFilters.classList.remove('img-filters--inactive');
};

AJAX.load(renderPictures, AJAX.statusHandler, 'downloaded');

export { Pictures };