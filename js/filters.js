import Const from './constants.js';

const imgUpload = document.querySelector('.img-upload__overlay');
const scaleValue = imgUpload.querySelector('.scale__value');
const scaleLine = imgUpload.querySelector('.scale__line');
const scalePin = imgUpload.querySelector('.scale__pin');

const getSaturation = () => {
    const SCALE_LENGTH = 450;
    const scalePosition = scalePin.offsetLeft;
    const saturation = Math.round(scalePosition / SCALE_LENGTH * 100);
    scaleValue.value = saturation; // set effect saturation into input field
    return saturation;
};

const imgUploadPreview = imgUpload.querySelector('.img-upload__preview');
const effectsList = imgUpload.querySelector('.effects__list');

// original photo (no effect) is selected by default
// this is needed for 'change' event to work properly
imgUpload.querySelector('.effects__radio').checked = true;

const setEffectSaturation = function(effect, saturation) {
    if (effect === 'chrome' || effect === 'gr') {
        this.style.filter = `grayscale(${saturation() * Const.FILTERS_COEF.CHROME})`;
    } else if (effect === 'sepia' || effect === 'se') {
        this.style.filter = `sepia(${saturation() * Const.FILTERS_COEF.SEPIA})`;
    } else if (effect === 'marvin' || effect === 'in') {
        this.style.filter = `invert(${saturation() * Const.FILTERS_COEF.MARVIN}%)`;
    } else if (effect === 'phobos' || effect === 'bl') {
        this.style.filter = `blur(${saturation() * Const.FILTERS_COEF.PHOBOS}px)`;
    } else if (effect === 'heat' || effect === 'br') {
        this.style.filter = `brightness(${saturation() * Const.FILTERS_COEF.HEAT})`;
    } else {
        this.style.filter = `none`;
    }
};

const setFilter = setEffectSaturation.bind(imgUploadPreview);

const dynamicSaturation = () => {
    const effectName = imgUploadPreview.style.filter.substr(0, 2);
    setFilter(effectName, getSaturation);
};

const onEffectChange = evt => {
    const effectName = evt.target.value;
    setFilter(effectName, getSaturation);
};

scaleLine.addEventListener('click', dynamicSaturation);
effectsList.addEventListener('change', onEffectChange);

export { getSaturation, dynamicSaturation, imgUploadPreview };