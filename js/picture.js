import AJAX from './ajax.js';
import render from './render.js';

const picturesContainer = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');

let picturesData = [];

const renderPictures = remoteData => {
    picturesData = remoteData;
    remoteData.shuffle();
    const fragment = document.createDocumentFragment();
    remoteData.forEach(element => {
        fragment.appendChild(render(element));
    });
    picturesContainer.appendChild(fragment);
    imgFilters.classList.remove('img-filters--inactive');
};

AJAX.load(renderPictures, AJAX.statusHandler, 'downloaded');

export { picturesData };