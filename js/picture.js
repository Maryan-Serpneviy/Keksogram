import Const from './constants.js';

const bigPicture = document.querySelector('.big-picture');
const likes = document.querySelector('.likes-count');
const picturesContainer = document.querySelector('.pictures');

export default class Picture {
    constructor(data) {
        this.url = data.url;
        this.likes = data.likes;
        this.comments = data.comments;
        this.description = data.description;
        this.filter = '';
    }
    static likePicture() {
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
        bigPicture.querySelector('.big-picture__img img').src = picture.url;
        bigPicture.querySelector('.likes-count').textContent = picture.likes;
        bigPicture.querySelector('.social__caption').textContent = picture.description;
    }
    static removePictures() {
        for (let i = 0; i < Const.MAGIC_NUMBER; i++) {
            Array.prototype.forEach.call(picturesContainer.childNodes, picture => {
                if (picture.className === 'picture__link') {
                    picture.remove();
                }
            });
        }
    }
}