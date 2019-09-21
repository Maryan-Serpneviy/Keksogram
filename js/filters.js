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

const setEffectSaturation = (effect, saturation) => {
    if (effect === 'chrome' || effect === 'gr') {
        imgUploadPreview.style.filter = `grayscale(${saturation() * Const.FILTERS_COEF.CHROME})`;
    } else if (effect === 'sepia' || effect === 'se') {
        imgUploadPreview.style.filter = `sepia(${saturation() * Const.FILTERS_COEF.SEPIA})`;
    } else if (effect === 'marvin' || effect === 'in') {
        imgUploadPreview.style.filter = `invert(${saturation() * Const.FILTERS_COEF.MARVIN}%)`;
    } else if (effect === 'phobos' || effect === 'bl') {
        imgUploadPreview.style.filter = `blur(${saturation() * Const.FILTERS_COEF.PHOBOS}px)`;
    } else if (effect === 'heat' || effect === 'br') {
        imgUploadPreview.style.filter = `brightness(${saturation() * Const.FILTERS_COEF.HEAT})`;
    } else {
        imgUploadPreview.style.filter = `none`;
    }
};

const dynamicSaturation = () => {
    const effectName = imgUploadPreview.style.filter.substr(0, 2);
    setEffectSaturation(effectName, getSaturation);
};

const onEffectChange = evt => {
    const effectName = evt.target.value;
    setEffectSaturation (effectName, getSaturation);
};

scaleLine.addEventListener ('click', dynamicSaturation);
effectsList.addEventListener ('change', onEffectChange);

export { getSaturation, dynamicSaturation, imgUploadPreview };