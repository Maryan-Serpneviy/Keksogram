'use strict';

(function() {
    var scaleLine = imgUpload.querySelector('.scale__line');
    var scaleLevel = imgUpload.querySelector('.scale__level');
    var scalePin = imgUpload.querySelector('.scale__pin');
    var scaleValue = imgUpload.querySelector('.scale__value');

    var getSaturationLevel = function() {
        var SCALE_LENGTH = 450;
        var scalePosition = scalePin.offsetLeft;
        var saturationLevel = scalePosition / SCALE_LENGTH * 100;
        scaleValue.value = saturationLevel;

        return saturationLevel;
    };

    scalePin.addEventListener('mouseup', getSaturationLevel);

    var effects = Array.from(imgUpload.querySelectorAll('.effects__item'));
    effects.forEach(function(elem) {
        elem.addEventListener('click', function() {
            scaleValue.value = 0;
        });
    });
})();