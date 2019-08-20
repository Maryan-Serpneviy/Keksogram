'use strict';

(function() {
    var uploadFile = document.querySelector('#upload-file');
    var uploadCancel = document.querySelector('#upload-cancel');
    window.imgUpload = document.querySelector('.img-upload__overlay');
    var uploadPreview = document.querySelector('.img-upload__preview');

    var openFilters = function() {
        imgUpload.classList.remove('hidden');
        document.addEventListener('keydown', onFiltersEscPress);
    };

    var closeFilters = function() {
        imgUpload.classList.add('hidden');
        clearFileInputField('#upload-file');  
        document.removeEventListener('keydown', onFiltersEscPress);
    };

    var onFiltersEscPress = function(evt) {
        if (evt.key === 'Escape') {
            closeFilters();
        }
    };

    var onPhotoUpload = function() {
        var file = uploadFile.files[0];
        var reader = new FileReader();

        reader.onload = (function(FILE) {
            return function(evt) {
                uploadPreview.innerHTML = ['<img class="img__preview" src="', evt.target.result,
                '" title="', escape(FILE.name), '"/>'].join('');
            };
        })(file);
        reader.readAsDataURL(file);
    };

    var clearFileInputField = function(Id) {
        document.querySelector(Id).value = '';
    };
    uploadFile.addEventListener('change', function() {
        onPhotoUpload();
        openFilters();
    });
    uploadCancel.addEventListener('click', closeFilters);
})();