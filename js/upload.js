'use strict';

(function() {
    const imgUpload = document.querySelector('.img-upload__overlay');
    const uploadFile = document.querySelector('#upload-file');
    const uploadCancel = document.querySelector('#upload-cancel');
    const uploadPreview = document.querySelector('.img-upload__preview');
    const imgSize = imgUpload.querySelector('.resize__control--value');

    const openFilters = () => {
        imgUpload.classList.remove('hidden');
        document.addEventListener ('keydown', onFiltersEscPress);
        imgSize.value = `${RESIZE_PARAMS.DEFAULT}%`;
        resizeImage(1);
    };

    const closeFilters = () => {
        imgUpload.classList.add('hidden');
        clearFileInputField('#upload-file');  
        document.removeEventListener('keydown', onFiltersEscPress);
    };

    const onFiltersEscPress = evt => {
        if (evt.key === 'Escape') {
            closeFilters();
        }
    };

    const onPhotoUpload = () => {
        const file = uploadFile.files[0];
        const reader = new FileReader();

        reader.onload = (FILE => {
            return evt => {
                uploadPreview.innerHTML = `<img class="img__preview" src="${evt.target.result}" title="${escape(FILE.name)}"/>`;
            };
        })(file);
        reader.readAsDataURL(file);
    };

    const clearFileInputField = Id => {
        document.querySelector(Id).value = '';
    };
    uploadFile.addEventListener ('change', () => {
        onPhotoUpload();
        openFilters();
    });
    uploadCancel.addEventListener ('click', closeFilters);
})();