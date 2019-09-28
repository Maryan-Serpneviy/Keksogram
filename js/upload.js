import Const from './constants.js';
import AJAX from './ajax.js';
import { resizeImage } from './resize.js';

const imgUpload = document.querySelector('.img-upload__overlay');
const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const uploadPreview = document.querySelector('.img-upload__preview');
const imgSize = imgUpload.querySelector('.resize__control--value');

const openFilters = () => {
    imgUpload.classList.remove('hidden');
    document.addEventListener('keydown', onFiltersEscPress);
    imgSize.value = `${Const.RESIZE_PARAMS.DEFAULT}%`;
    resizeImage(1);
};

const closeFilters = () => {
    imgUpload.classList.add('hidden');
    document.removeEventListener('keydown', onFiltersEscPress);
};

const onFiltersEscPress = evt => {
    if (evt.key === 'Escape') {
        closeFilters();
    }
};

uploadFile.addEventListener('change', () => {
    const file = uploadFile.files[0];
    const fileName = file.name.toLowerCase();
    const matches = Const.IMAGE_FORMATS.some(it => fileName.endsWith(it));

    if (matches) {
        const reader = new FileReader();
        reader.addEventListener('load', evt => {
            uploadPreview.innerHTML = `<img class="img__preview" src="${evt.target.result}" title="${escape(fileName)}"/>`;
        });
        reader.readAsDataURL(file);
        openFilters();
        return;
    }
    AJAX.statusHandler('Error! Wrong file type');
});

uploadCancel.addEventListener('click', closeFilters);