'use strict';

(function() {
    var uploadFile = document.querySelector('#upload-file');
    var uploadCancel = document.querySelector('#upload-cancel');
    window.imgUpload = document.querySelector('.img-upload__overlay');

    var openFilters = function() {
        imgUpload.classList.remove('hidden');
        document.addEventListener('keydown', onFiltersEscPress);
    };

    var closeFilters = function() {
        imgUpload.classList.add('hidden');
        clearFileInputField('upload-file');  
        document.removeEventListener('keydown', onFiltersEscPress);
    };

    var onFiltersEscPress = function(evt) {
        if (evt.key === 'Escape') {
            closeFilters();
        }
    };

    var clearFileInputField = function(Id) {
        document.getElementById(Id).innerHTML = document.getElementById(Id).innerHTML;
    };
    uploadFile.addEventListener('change', openFilters);
    uploadCancel.addEventListener('click', closeFilters);
})();