import { picturesData } from './picture.js';
const bigPicture = document.querySelector('.big-picture');

const showBigPicture = picture => {
    const commentsContainer = bigPicture.querySelector('.social__comments');
    const comment = bigPicture.querySelector('.social__comment');

    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    commentsContainer.innerHTML = '';
    
    const commentsFragment = document.createDocumentFragment();
    picture.comments.forEach(element => {
        comment.querySelector('.social__picture').src = element.avatar;
        comment.querySelector('.social__text').textContent = element.message;
        commentsFragment.appendChild(comment.cloneNode(true));
    });

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
        picturesData.forEach(element => {
            if (target.src.includes(element.url)) {
                showBigPicture (element);
            }
        })
        bigPicture.classList.remove('hidden');
    }
    const likes = document.querySelector('.likes-count');
    let liked = false;
    likes.addEventListener ('click', function() {
        if (!liked) {
            likes.textContent = parseInt(likes.textContent) + 1;
            liked = true;
        }
    })
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

const onDocumentClick = evt => {
    const target = evt.target;
    if (target.classList.contains('big-picture')) {
        closeBigPicture();
    }
}

imgContainer.addEventListener ('click', openBigPicture);
bigPictureCloseBtn.addEventListener ('click', closeBigPicture);
document.addEventListener ('click', onDocumentClick)