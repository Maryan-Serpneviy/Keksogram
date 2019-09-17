// filters.js
const filtersScale = imgUpload.querySelector('.scale');
const filtersScaleValue = imgUpload.querySelector('.scale__value');
const filtersScaleLine = imgUpload.querySelector('.scale__line');
const filtersScalePin = imgUpload.querySelector('.scale__pin');
const filtersScaleLevel = imgUpload.querySelector('.scale__level');
const effectsList = imgUpload.querySelector('.effects__list');
export const imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');

const filtersSlider = new Slider(filtersScale, filtersScaleValue, filtersScaleLine, filtersScalePin, filtersScaleLevel, 450, 45);

// original photo (no effect) is selected by default
// this is needed for 'change' event to work properly
imgUpload.querySelector('.effects__radio').checked = true;

const FILTERS_COEF = {
    chrome: 0.01,
    sepia: 0.01,
    marvin: 1,
    phobos: 0.15,
    heat: 0.05
};

const setEffectSaturation = (effect, saturation) => {
    if (effect === 'chrome' || effect === 'gr') {
        imgUploadPreview.style.filter = `grayscale(${saturation() * FILTERS_COEF.chrome})`;
    } else if (effect === 'sepia' || effect === 'se') {
        imgUploadPreview.style.filter = `sepia(${saturation() * FILTERS_COEF.sepia})`;
    } else if (effect === 'marvin' || effect === 'in') {
        imgUploadPreview.style.filter = `invert(${saturation() * FILTERS_COEF.marvin}%)`;
    } else if (effect === 'phobos' || effect === 'bl') {
        imgUploadPreview.style.filter = `blur(${saturation() * FILTERS_COEF.phobos}px)`;
    } else if (effect === 'heat' || effect === 'br') {
        imgUploadPreview.style.filter = `brightness(${saturation() * FILTERS_COEF.heat})`;
    } else {
        imgUploadPreview.style.filter = `none`;
    }
};

export const dynamicSaturation = () => {
    const effectName = imgUploadPreview.style.filter.substr(0, 2);
    setEffectSaturation (effectName, filtersSlider.getScaleValue);
};

const onEffectChange = evt => {
    const effectName = evt.target.value;
    setEffectSaturation (effectName, filtersSlider.getScaleValue);
};

scaleLine.addEventListener('click', dynamicSaturation);
effectsList.addEventListener('change', onEffectChange);

// slider.js
class Slider {
    constructor (scale, scaleValue, scaleLine, scalePin, scaleLevel, scaleLength, scaleOverflow = 0) {
        this.scale = scale;
        this.scaleValue = scaleValue;
        this.scaleLine = scaleLine;
        this.scalePin = scalePin;
        this.scaleLevel = scaleLevel;
        this.scaleLength = scaleLength;
        this.scaleOverflow = scaleOverflow;
    };

    SCALE_LIMITS = {
        min: 0,
        max: scale.offsetWidth - scaleOverflow
    };

    getPinPosition (coord, shift) {
        let pinPosition = '';
        if (coord > this.scaleLine.getBoundingClientRect().right) {
            pinPosition = this.SCALE_LIMITS.max + 'px';
        } else if (coord < this.scaleLine.getBoundingClientRect().left) {
            pinPosition = this.SCALE_LIMITS.min + 'px';
        } else {
            pinPosition = (this.scalePin.offsetLeft - shift) + 'px';
        }
        return pinPosition;
    };

    getScaleValue () {
        const scalePosition = this.scalePin.offsetLeft;
        const saturation = Math.round(scalePosition / scaleLength * 100);
        this.scaleValue.value = saturation; // set effect saturation into input field
        return saturation;
    };
}