import Const from './constants.js';

export default class Picture {
    constructor(data) {
        this.url = data.url;
        this.likes = data.likes;
        this.comments = data.comments;
        this.description = data.description;
        this.filter = '';
    }
    static likePicture() {
        const likes = document.querySelector('.likes-count');
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
    }
    static showBigPicture(picture) {
        const bigPicture = document.querySelector('.big-picture');
        bigPicture.querySelector('.big-picture__img img').src = picture.url;
        bigPicture.querySelector('.likes-count').textContent = picture.likes;
        bigPicture.querySelector('.social__caption').textContent = picture.description;
        bigPicture.classList.remove('hidden');
        document.addEventListener('keydown', Picture.onBigPictureEscPress);
    }
    static closeBigPicture() {
        document.querySelector('.big-picture').classList.add('hidden');
        document.querySelector('.social__loadmore').classList.remove('hidden');
        document.removeEventListener('keydown', Picture.onBigPictureEscPress);
    }
    static onBigPictureEscPress(evt) {
        if (evt.key === 'Escape') {
            Picture.closeBigPicture();
        }
    }
    static removePictures() {
        const picturesContainer = document.querySelector('.pictures');
        for (let i = 0; i < Const.MAGIC_NUMBER; i++) {
            Array.prototype.forEach.call(picturesContainer.childNodes, picture => {
                if (picture.className === 'picture__link') {
                    picture.remove();
                }
            });
        }
    }
}