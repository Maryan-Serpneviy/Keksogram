import Picture from './picture.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');
const likes = document.querySelector('.likes-count');

const onDocumentClick = evt => {
    const target = evt.target;
    if (target.classList.contains('big-picture')) {
        Picture.closeBigPicture();
    }
};

bigPictureCloseBtn.addEventListener('click', Picture.closeBigPicture);
document.addEventListener('click', onDocumentClick);
likes.addEventListener('click', Picture.likePicture());