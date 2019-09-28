import { picturesData } from './picture.js';

const imgContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');
const btnLoadMore = bigPicture.querySelector('.social__loadmore');
const likes = document.querySelector('.likes-count');

const showBigPicture = picture => {
    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.social__caption').textContent = picture.description;
};

const likePicture = () => {
    let liked = null;
    return () => {
        if (!liked) {
            likes.textContent = parseInt(likes.textContent) + 1;
            liked = true;
        } else {
            likes.textContent = parseInt(likes.textContent) - 1;
            liked = false;
        }
    };
};

const bigPictureHandler = evt => {
    const target = evt.target;
    if (target.className === 'picture__img') {
        picturesData.forEach(element => {
            if (target.src.includes(element.url)) {
                showBigPicture(element);
            }
        });
        bigPicture.classList.remove('hidden');
    }
    document.addEventListener('keydown', onBigPictureEscPress);
};

const closeBigPicture = () => {
    bigPicture.classList.add('hidden');
    btnLoadMore.classList.remove('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
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
};

imgContainer.addEventListener('click', bigPictureHandler);
bigPictureCloseBtn.addEventListener('click', closeBigPicture);
document.addEventListener('click', onDocumentClick);
likes.addEventListener('click', likePicture());