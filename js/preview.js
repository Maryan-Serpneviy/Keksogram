import Picture from './picture.js';
import { Pictures } from './gallery.js';

const imgContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');
const btnLoadMore = bigPicture.querySelector('.social__loadmore');
const likes = document.querySelector('.likes-count');

const bigPictureHandler = evt => {
    const target = evt.target;
    if (target.className === 'picture__img') {
        Pictures.forEach(picture => {
            if (target.src.includes(picture.url)) {
                Picture.showBigPicture(picture);
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
likes.addEventListener('click', Picture.likePicture());