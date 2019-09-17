import backend from './backend.js';

const imgUpload = document.querySelector('.img-upload');
const form = imgUpload.querySelector('.img-upload__form');

const successHandler = () => {
    imgUpload.classList.add('hidden');
    form.reset();
};

form.addEventListener ('submit', evt => {
    evt.preventDefault();
    backend.save (new FormData(form), successHandler, backend.errorHandler);
});