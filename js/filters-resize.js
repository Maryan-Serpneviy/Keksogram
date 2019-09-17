'use strict';

(function() {
    const imgUpload = document.querySelector('.img-upload__overlay');
    const img = imgUpload.querySelector('.img-upload__preview');
    const imgReduce = imgUpload.querySelector('.resize__control--minus');
    const imgEnlarge = imgUpload.querySelector('.resize__control--plus');
    const imgSize = imgUpload.querySelector('.resize__control--value');
    
    window.RESIZE_PARAMS = {
        MIN: 30,
        MAX: 100,
        STEP: 10,
        DEFAULT: 80
    };
    imgSize.value = `${RESIZE_PARAMS.DEFAULT}%`;

    window.resizeImage = sign => {
        let resizeValue = imgSize.value;
        resizeValue = parseInt(resizeValue) - RESIZE_PARAMS.STEP * sign;
        if (resizeValue > RESIZE_PARAMS.MAX) {
            resizeValue = RESIZE_PARAMS.MAX;
        } else if (resizeValue < RESIZE_PARAMS.MIN) {
            resizeValue = RESIZE_PARAMS.MIN;
        }
        resizeValue += '%';
        imgSize.value = resizeValue;
        img.style.transform = `scale(${parseInt(resizeValue) / 100})`;
        img.style.position = `relative`;
    };
    resizeImage(1);

    imgReduce.addEventListener ('click', () => {
        resizeImage(1);
    });

    imgEnlarge.addEventListener ('click', () => {
        resizeImage(-1);
    });
})();