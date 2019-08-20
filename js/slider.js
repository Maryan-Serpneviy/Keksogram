'use strict';

// filters.js
(function() {
    var filtersScale = imgUpload.querySelector('.scale');
    var filtersScaleValue = imgUpload.querySelector('.scale__value');
    var filtersScaleLine = imgUpload.querySelector('.scale__line');
    var filtersScalePin = imgUpload.querySelector('.scale__pin');
    var filtersScaleLevel = imgUpload.querySelector('.scale__level');

    window.imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
    var effectsList = imgUpload.querySelector('.effects__list');

    const filtersSlider = new Slider(filtersScale, filtersScaleValue, filtersScaleLine, filtersScalePin, filtersScaleLevel, 450, 45);

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

    var setEffectSaturation = function(effect, saturation) {
        if (effect === 'chrome' || effect === 'gr') {
            window.imgUploadPreview.style.filter = 'grayscale(' + saturation() * FILTERS_COEF.chrome + ')';
        } else if (effect === 'sepia' || effect === 'se') {
            window.imgUploadPreview.style.filter = 'sepia(' + saturation() * FILTERS_COEF.sepia + ')';
        } else if (effect === 'marvin' || effect === 'in') {
            window.imgUploadPreview.style.filter = 'invert(' + (saturation() * FILTERS_COEF.marvin) + '%)';
        } else if (effect === 'phobos' || effect === 'bl') {
            window.imgUploadPreview.style.filter = 'blur(' + saturation() * FILTERS_COEF.phobos + 'px)';
        } else if (effect === 'heat' || effect === 'br') {
            window.imgUploadPreview.style.filter = 'brightness(' + saturation() * FILTERS_COEF.heat + ')';
        } else {
            window.imgUploadPreview.style.filter = 'none';
        }
    };

    window.dynamicSaturation = function() {
        var effectName = imgUploadPreview.style.filter.substr(0, 2);
        setEffectSaturation(effectName, filtersSlider.getScaleValue);
    };

    var onEffectChange = function(evt) {
        var effectName = evt.target.value;
        setEffectSaturation(effectName, filtersSlider.getScaleValue);
    };

    scaleLine.addEventListener('click', dynamicSaturation);
    effectsList.addEventListener('change', onEffectChange);
})();

// slider.js
(function() {
    function Slider(scale, scaleValue, scaleLine, scalePin, scaleLevel, scaleLength, scaleOverflow = 0) {
        this.scale = scale;
        this.scaleValue = scaleValue;
        this.scaleLine = scaleLine;
        this.scalePin = scalePin;
        this.scaleLevel = scaleLevel;
        this.scaleLength = scaleLength;
        this.SCALE_LIMITS = {
            min: 0,
            max: scale.offsetWidth - scaleOverflow
        };

        this.getPinPosition = function(coord, shift) {
            var pinPosition = '';
            if (coord > this.scaleLine.getBoundingClientRect().right) {
                pinPosition = this.SCALE_LIMITS.max + 'px';
            } else if (coord < this.scaleLine.getBoundingClientRect().left) {
                pinPosition = this.SCALE_LIMITS.min + 'px';
            } else {
                pinPosition = (this.scalePin.offsetLeft - shift) + 'px';
            }
            return pinPosition;
        };

        this.getScaleValue = function() {
            var scalePosition = this.scalePin.offsetLeft;
            var saturation = Math.round(scalePosition / scaleLength * 100);
            this.scaleValue.value = saturation; // set effect saturation into input field
            return saturation;
        };
    }
})();