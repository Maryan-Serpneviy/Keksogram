'use strict';

(function() {
    const bigPicture = document.querySelector('.big-picture');

    const showBigPicture = picture => {
        const commentsContainer = bigPicture.querySelector('.social__comments');
        const comment = bigPicture.querySelector('.social__comment');
        bigPicture.querySelector('.big-picture__img img').src = picture.url;
        bigPicture.querySelector('.likes-count').textContent = picture.likes;
        bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
        commentsContainer.innerHTML = '';
        
        const commentsFragment = document.createDocumentFragment();
        for (let i = 0; i < picture.comments.length; i++) {
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
    const imgContainer = document.querySelector('.pictures');
    const bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');

    const openBigPicture = evt => {
        const target = evt.target;
        if (target.className === 'picture__img') {           
            for (let i = 0; i < picturesData.length; i++) {
                if (target.src.includes(picturesData[i].url)) {
                    showBigPicture(picturesData[i]);
                }
            }
            bigPicture.classList.remove('hidden');
        }
        document.addEventListener ('keydown', onBigPictureEscPress); 
    };

    const closeBigPicture = () => {
        bigPicture.classList.add('hidden');
        document.removeEventListener ('keydown', onBigPictureEscPress);
    };

    const onBigPictureEscPress = evt => {
        if (evt.key === 'Escape') {
            closeBigPicture();
        }
    };
    imgContainer.addEventListener ('click', openBigPicture);
    bigPictureCloseBtn.addEventListener ('click', closeBigPicture);
})();