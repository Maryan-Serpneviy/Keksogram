'use strict';

const PICTURES_COUNT = 25;
const LIKES = {
    min: 15,
    max: 200
};
var COMMENTS_PATTERNS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTION_PATTERNS = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
]
var AVATARS_COUNT = 6;

var pictureTemplate = document.querySelector('#picture').content;
var picturesContainer = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');

Object.defineProperty(
    Object.prototype,
    'randomElement', {
        value: function () {
            var rand = Math.floor(Math.random() * this.length);
            return this[rand];
        }
    }
);

function getRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}

function getRandomArrayElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomComment(source) {
    var comments = [];
    var commentsQuantity = getRandomNumber(1, source.length);
    var commentLength = getRandomNumber(1, 2);
    for (let i = 0; i < commentsQuantity; ++i) {
        comments[i] = '';
        for (let j = 0; j < commentLength; ++j) {
            comments[i] += ' ' + getRandomArrayElement(source);
        }
    }
    return comments;
}

function generatePictureData(index) {
    return {
        url: 'photos/' + (index + 1) + '.jpg',
        likes: getRandomNumber(LIKES.min, LIKES.max),
        comments: generateRandomComment(COMMENTS_PATTERNS),
        description: DESCRIPTION_PATTERNS.randomElement()
    }
}

function generatePicturesPreview(picturesCount) {
    var picturesItems = [];
    for (let i = 0; i < picturesCount; ++i) {
        picturesItems[i] = generatePictureData(i);
    }
    return picturesItems;
}

var pictures = generatePicturesPreview(PICTURES_COUNT);

function renderElement(data) {
    var thumbElement = pictureTemplate.querySelector('.picture__link').cloneNode(true);
    thumbElement.querySelector('.picture__img').src = data.url;
    thumbElement.querySelector('.picture__stat--likes').textContent = data.likes;
    thumbElement.querySelector('.picture__stat--comments').textContent = data.comments.length;
    return thumbElement;
}

function renderPictures() {
    var fragment = document.createDocumentFragment();
    for (let i = 0; i < PICTURES_COUNT; ++i) {
        fragment.appendChild(renderElement(pictures[i]));
    }
    picturesContainer.appendChild(fragment);
}

function showBigPicture(picture) {
    var commentsContainer = bigPicture.querySelector('.social__comments');
    var commentTemplate = bigPicture.querySelector('.social__comment');

    //bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;

    commentsContainer.innerHTML = '';
    var commentsFragment = document.createDocumentFragment();
    for (let i = 0; i < picture.comments.length; ++i) {
        commentTemplate.querySelector('.social__picture').src = 'img/avatar-' + getRandomNumber(1, AVATARS_COUNT) + '.svg';
        commentTemplate.querySelector('.social__text').textContent = picture.comments[i];
        commentsFragment.appendChild(commentTemplate.cloneNode(true));
    }
    commentsContainer.appendChild(commentsFragment);

    bigPicture.querySelector('.social__caption').textContent = picture.description;
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.social__loadmore').classList.add('visually-hidden');
}

renderPictures();
showBigPicture(pictures[0]);
