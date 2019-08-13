'use strict';

(function() {
    var scaleLine = imgUpload.querySelector('.scale__line');
    var scalePin = imgUpload.querySelector('.scale__pin');
    var scaleValue = imgUpload.querySelector('.scale__value');

    var getSaturationLevel = function() {
        var SCALE_LENGTH = 450;
        var scalePosition = scalePin.offsetLeft;
        var saturationLevel = Math.round(scalePosition / SCALE_LENGTH * 100);
        scaleValue.value = saturationLevel;
        //console.log(scaleValue.value);

        return saturationLevel;
    };

    scalePin.addEventListener('mouseup', onEffectChange);
    scaleLine.addEventListener('click', onEffectChange);

    var imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
    var effectsList = imgUpload.querySelector('.effects__list');

    var changeFilter = function(effect) {
        var EFFECTS_MULTIPLIER = {
            marvin: 100,
            phobos: 3,
            heat: 3
        };
        var effectSaturation = '';
        if (effect === 'chrome') {
            effectSaturation = 'grayscale(' + getSaturationLevel() + ')';
        } else if (effect === 'sepia') {
            effectSaturation = 'sepia(' + getSaturationLevel() + ')';
        } else if (effect === 'marvin') {
            effectSaturation = 'invert(' + (getSaturationLevel() * EFFECTS_MULTIPLIER.marvin) + '%)';
        } else if (effect === 'phobos') {
            effectSaturation = 'blur(' + getSaturationLevel() /* * EFFECTS_MAX.phobos)*/ + 'px)';
        } else if (effect === 'heat') {
            effectSaturation = 'brightness(' + getSaturationLevel() /* * EFFECTS_MAX.heat)*/ + ')';
        }
        return effectSaturation;      
    };

    var onEffectChange = function(evt) {
        var effect = evt.target.value;
        scaleValue.value = 0;
        //console.log(scaleValue.value);
        var filter = changeFilter(effect);
        
        imgUploadPreview.style.filter = filter;
    };

    effectsList.addEventListener('change', onEffectChange);
})();