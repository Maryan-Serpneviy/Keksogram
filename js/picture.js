'use strict';

(function() {
    var pictureTemplate = document.querySelector('#picture').content;
    var picturesContainer = document.querySelector('.pictures');

    var renderElement = function(data) {
        var thumbElement = pictureTemplate.querySelector('.picture__link').cloneNode(true);
        thumbElement.querySelector('.picture__img').src = data.url;
        thumbElement.querySelector('.picture__stat--likes').textContent = data.likes;
        thumbElement.querySelector('.picture__stat--comments').textContent = data.comments.length;
        return thumbElement;
    };

    var renderPictures = function(remoteData) {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < remoteData.length; i++) {
            fragment.appendChild(renderElement(remoteData[i]));
        }
        picturesContainer.appendChild(fragment);
    };
    window.backend.load(renderPictures, window.backend.showErrorMessage);
})();