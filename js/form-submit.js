'use strict';

(function() {
    var imgUpload = document.querySelector('.img-upload');
    var form = imgUpload.querySelector('.img-upload__form');
    
    var successHandler = function() {
        imgUpload.classList.add('hidden');
        form.reset();
    };

    form.addEventListener('submit', function(evt) {
        evt.preventDefault();
        window.backend.save(new FormData(form), successHandler, window.backend.errorHandler);
    });
});