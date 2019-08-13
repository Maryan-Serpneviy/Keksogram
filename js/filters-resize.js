'use strict';

(function() {
    var img = imgUpload.querySelector('.img-upload__preview');
    var imgReduce = imgUpload.querySelector('.resize__control--minus');
    var imgEnlarge = imgUpload.querySelector('.resize__control--plus');
    var imgSize = imgUpload.querySelector('.resize__control--value');
    
    var RESIZE_PARAMS = {
        MIN: 50,
        MAX: 110,
        STEP: 10,
        DEFAULT: 100
    };
    imgSize.value = RESIZE_PARAMS.DEFAULT + '%';

    var resizeImage = function (sign) {
        var resizeValue = imgSize.value;
        resizeValue = parseInt(resizeValue) - RESIZE_PARAMS.STEP * sign;
        if (resizeValue > RESIZE_PARAMS.MAX) {
            resizeValue = RESIZE_PARAMS.MAX;
        } else if (resizeValue < RESIZE_PARAMS.MIN) {
            resizeValue = RESIZE_PARAMS.MIN;
        }
        resizeValue += '%';
        imgSize.value = resizeValue;
        img.style.transform = 'scale(' + (parseInt(resizeValue) / 100) + ')';
        img.style.position = 'relative';
    };

    imgReduce.addEventListener('click', function() {
        resizeImage(1);
    });

    imgEnlarge.addEventListener('click', function() {
        resizeImage(-1);
    });
})();