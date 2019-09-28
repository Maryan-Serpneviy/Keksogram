import Const from './constants.js';

const imgUpload = document.querySelector('.img-upload__overlay');
const img = imgUpload.querySelector('.img-upload__preview');
const imgReduce = imgUpload.querySelector('.resize__control--minus');
const imgEnlarge = imgUpload.querySelector('.resize__control--plus');
const imgSize = imgUpload.querySelector('.resize__control--value');

imgSize.value = `${Const.RESIZE_PARAMS.DEFAULT}%`;

const resizeImage = sign => {
    let resizeValue = imgSize.value;
    resizeValue = parseInt(resizeValue) - Const.RESIZE_PARAMS.STEP * sign;
    if (resizeValue > Const.RESIZE_PARAMS.MAX) {
        resizeValue = Const.RESIZE_PARAMS.MAX;
    } else if (resizeValue < Const.RESIZE_PARAMS.MIN) {
        resizeValue = Const.RESIZE_PARAMS.MIN;
    }
    resizeValue += '%';
    imgSize.value = resizeValue;
    img.style.transform = `scale(${parseInt(resizeValue) / 100})`;
    img.style.position = `relative`;
};
resizeImage(1);

imgReduce.addEventListener('click', () => {
    resizeImage(1);
});

imgEnlarge.addEventListener('click', () => {
    resizeImage(-1);
});

export { resizeImage };