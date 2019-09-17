'use strict';

(function() {
    const imgUpload = document.querySelector('.img-upload__overlay');
    const scaleValue = imgUpload.querySelector('.scale__value');
    const scaleLine = imgUpload.querySelector('.scale__line');
    const scalePin = imgUpload.querySelector('.scale__pin');

    window.getSaturation = () => {
        const SCALE_LENGTH = 450;
        const scalePosition = scalePin.offsetLeft;
        const saturation = Math.round(scalePosition / SCALE_LENGTH * 100);
        scaleValue.value = saturation; // set effect saturation into input field
        return saturation;
    };

    window.imgUploadPreview = imgUpload.querySelector('.img-upload__preview');
    const effectsList = imgUpload.querySelector('.effects__list');

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
            window.imgUploadPreview.style.filter = `grayscale(${saturation() * FILTERS_COEF.chrome})`;
        } else if (effect === 'sepia' || effect === 'se') {
            window.imgUploadPreview.style.filter = `sepia(${saturation() * FILTERS_COEF.sepia})`;
        } else if (effect === 'marvin' || effect === 'in') {
            window.imgUploadPreview.style.filter = `invert(${saturation() * FILTERS_COEF.marvin}%)`;
        } else if (effect === 'phobos' || effect === 'bl') {
            window.imgUploadPreview.style.filter = `blur(${saturation() * FILTERS_COEF.phobos}px)`;
        } else if (effect === 'heat' || effect === 'br') {
            window.imgUploadPreview.style.filter = `brightness(${saturation() * FILTERS_COEF.heat})`;
        } else {
            window.imgUploadPreview.style.filter = `none`;
        }
    };

    window.dynamicSaturation = () => {
        const effectName = imgUploadPreview.style.filter.substr(0, 2);
        setEffectSaturation(effectName, getSaturation);
    };

    const onEffectChange = evt => {
        const effectName = evt.target.value;
        setEffectSaturation (effectName, getSaturation);
    };

    scaleLine.addEventListener ('click', dynamicSaturation);
    effectsList.addEventListener ('change', onEffectChange);
})();