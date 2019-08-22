'use strict';

(function() {
    var bigPicture = document.querySelector('.big-picture');

    var showBigPicture = function(picture) {
        var commentsContainer = bigPicture.querySelector('.social__comments');
        var comment = bigPicture.querySelector('.social__comment');
        bigPicture.querySelector('.big-picture__img img').src = picture.url;
        bigPicture.querySelector('.likes-count').textContent = picture.likes;
        bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
        commentsContainer.innerHTML = '';
        
        var commentsFragment = document.createDocumentFragment();
        for (var i = 0; i < picture.comments.length; i++) {
            comment.querySelector('.social__picture').src = picture.comments[i].avatar;
            comment.querySelector('.social__text').textContent = picture.comments[i].message;
            commentsFragment.appendChild(comment.cloneNode(true));
        }
        commentsContainer.appendChild(commentsFragment);

        bigPicture.querySelector('.social__caption').textContent = picture.description;
        bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
        bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
    };
    
    // BIG PICTURE EVENTS
    var imgContainer = document.querySelector('.pictures');
    var bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');

    var openBigPicture = function(evt) {
        var target = evt.target;
        if (target.className === 'picture__img') {           
            for (var i = 0; i < picturesData.length; i++) {
                if (target.src.includes(picturesData[i].url)) {
                    showBigPicture(picturesData[i]);
                }
            }
            bigPicture.classList.remove('hidden');
        }
        document.addEventListener('keydown', onBigPictureEscPress); 
    };

    var closeBigPicture = function() {
        bigPicture.classList.add('hidden');
        document.removeEventListener('keydown', onBigPictureEscPress);
    };

    var onBigPictureEscPress = function(evt) {
        if (evt.key === 'Escape') {
            closeBigPicture();
        }
    };
    imgContainer.addEventListener('click', openBigPicture);
    bigPictureCloseBtn.addEventListener('click', closeBigPicture);
})();