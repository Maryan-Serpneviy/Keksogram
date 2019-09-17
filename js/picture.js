'use strict';

(function() {
    const pictureTemplate = document.querySelector('#picture').content;
    const picturesContainer = document.querySelector('.pictures');

    const renderElement = data => {
        const thumbElement = pictureTemplate.querySelector('.picture__link').cloneNode(true);
        thumbElement.querySelector('.picture__img').src = data.url;
        thumbElement.querySelector('.picture__stat--likes').textContent = data.likes;
        thumbElement.querySelector('.picture__stat--comments').textContent = data.comments.length;
        return thumbElement;
    };

    const renderPictures = remoteData => {
        window.picturesData = remoteData;
        window.utils.shuffle(remoteData);
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < remoteData.length; i++) {
            fragment.appendChild(renderElement(remoteData[i]));
        }
        picturesContainer.appendChild(fragment);
    };
    window.backend.load(renderPictures, window.backend.errorHandler);
})();