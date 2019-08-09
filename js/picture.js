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

    var renderPictures = function() {
        var fragment = document.createDocumentFragment();
        for (var i = 0; i < PICTURES_COUNT; i++) {
            fragment.appendChild(renderElement(pictures[i]));
        }
        picturesContainer.appendChild(fragment);
    };

    var PICTURES_COUNT = 25;

    var generatePicturesPreview = function(picturesCount) {
        var picturesItems = [];
        for (var i = 0; i < picturesCount; i++) {
            picturesItems[i] = generatePictureData(i);
        }
        return picturesItems;
    };
    window.pictures = generatePicturesPreview(PICTURES_COUNT);
    renderPictures();
})();