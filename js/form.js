import AJAX from './ajax.js';

const imgUpload = document.querySelector('.img-upload');
const form = imgUpload.querySelector('.img-upload__form');

const successHandler = () => {
    imgUpload.classList.add('hidden');
    form.reset();
};

form.addEventListener('submit', function(evt) {
    evt.preventDefault();
    AJAX.save(new FormData(this), successHandler, AJAX.statusHandler, 'uploaded');
});