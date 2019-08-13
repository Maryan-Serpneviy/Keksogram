'use strict';

(function() {
    window.scale = imgUpload.querySelector('.scale');
    window.scaleValue = imgUpload.querySelector('.scale__value');
    window.scaleLine = imgUpload.querySelector('.scale__line');
    window.scalePin = imgUpload.querySelector('.scale__pin');
    window.scaleLevel = imgUpload.querySelector('.scale__level');

    window.getSaturation = function() {
        var SCALE_LENGTH = 450;
        var scalePosition = scalePin.offsetLeft;
        var saturation = Math.round(scalePosition / SCALE_LENGTH * 100);
        scaleValue.value = saturation;
        //console.log(scaleValue.value);

        return saturation;
    };

    window.imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
    var effectsList = imgUpload.querySelector('.effects__list');

    // original photo (no effect) is selected by default
    // this is needed for 'change' event to work properly
    imgUpload.querySelector('.effects__radio').checked = true;

    var FILTERS_COEF = {
        chrome: 0.01,
        sepia: 0.01,
        marvin: 1,
        phobos: 0.15,
        heat: 0.05
    };

    var changeFilter = function(effect, saturation) {
        var effectSaturation = '';
        if (effect === 'chrome') {
            effectSaturation = 'grayscale(' + saturation() * FILTERS_COEF.chrome + ')';
        } else if (effect === 'sepia') {
            effectSaturation = 'sepia(' + saturation() * FILTERS_COEF.sepia + ')';
        } else if (effect === 'marvin') {
            effectSaturation = 'invert(' + saturation() * FILTERS_COEF.marvin + '%)';
        } else if (effect === 'phobos') {
            effectSaturation = 'blur(' + saturation() * FILTERS_COEF.phobos + 'px)';
        } else if (effect === 'heat') {
            effectSaturation = 'brightness(' + saturation() * FILTERS_COEF.heat + ')';
        }
        return effectSaturation;      
    };

    window.setFilterValue = function(effect, saturation) {
        if (effect === 'gr') {
            window.imgUploadPreview.style.filter = 'grayscale(' + saturation() * FILTERS_COEF.chrome + ')';
        } else if (effect === 'se') {
            window.imgUploadPreview.style.filter = 'sepia(' + saturation() * FILTERS_COEF.sepia + ')';
        } else if (effect === 'in') {
            window.imgUploadPreview.style.filter = 'invert(' + (saturation() * FILTERS_COEF.marvin) + '%)';
        } else if (effect === 'bl') {
            window.imgUploadPreview.style.filter = 'blur(' + saturation() * FILTERS_COEF.phobos + 'px)';
        } else if (effect === 'br') {
            window.imgUploadPreview.style.filter = 'brightness(' + saturation() * FILTERS_COEF.heat + ')';
        }    
    };

    window.dynamicSaturation = function() {
        var effectName = imgUploadPreview.style.filter.substr(0, 2);
        setFilterValue(effectName, getSaturation);
    };

    var onEffectChange = function(evt) {
        var effect = evt.target.value;
        scaleValue.value = 0;
        var filter = changeFilter(effect, window.getSaturation);
        window.imgUploadPreview.style.filter = filter;
    };

    scaleLine.addEventListener('click', dynamicSaturation);
    effectsList.addEventListener('change', onEffectChange);
})();