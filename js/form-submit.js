'use strict';

(function() {
    const imgUpload = document.querySelector('.img-upload');
    const form = imgUpload.querySelector('.img-upload__form');
    
    const successHandler = () => {
        imgUpload.classList.add('hidden');
        form.reset();
    };

    form.addEventListener ('submit', evt => {
        evt.preventDefault();
        window.backend.save (new FormData(form), successHandler, window.backend.errorHandler);
    });
});