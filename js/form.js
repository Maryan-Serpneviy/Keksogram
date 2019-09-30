import AJAX from './ajax.js';
import Picture from './picture.js';
import render from './render.js';
import { Filter } from './filters.js';

const picturesContainer = document.querySelector('.pictures');
const imgUpload = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const textHashtags = imgUpload.querySelector('.text__hashtags');
const textDescription = imgUpload.querySelector('.text__description');
const submit = imgUpload.querySelector('.img-upload__submit');

const successHandler = () => {
    imgUpload.classList.add('hidden');
    form.reset();
};

const applyFilter = filter => {
    let imgFilters = '';
    for (const key in filter) {
        if (Object.prototype.hasOwnProperty.call(filter, key)) {
            imgFilters += filter[key];
        }
    }
    return imgFilters;
};

submit.addEventListener('click', function(evt) {
    evt.preventDefault();

    const URL = imgUpload.querySelector('.img__preview').src;
    const DESCRIPTION = `${textHashtags.value} ${textDescription.value}`;
    const FILTER = applyFilter(Filter);
    const picture = new Picture({ url: URL, likes: 0, comments: '', description: DESCRIPTION, filter: FILTER });
    picturesContainer.appendChild(render(picture));
    AJAX.save(new FormData(form), successHandler, AJAX.statusHandler, 'uploaded');
});