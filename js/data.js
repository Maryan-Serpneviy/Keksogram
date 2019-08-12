'use strict';

(function() {
    var LIKES = {
        min: 15,
        max: 200
    };
    var COMMENTS_COUNT = 3;
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
    ];

    Object.defineProperty(
        Object.prototype,
        'randomElement', {
            value: function () {
                var rand = Math.floor(Math.random() * this.length);
                return this[rand];
            }
        }
    );

    window.getRandomNumber = function(min, max) {
        return Math.floor(min + Math.random() * (max - min + 1));
    };

    var getRandomArrayElement = function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    var generateRandomComment = function(source) {
        var comments = [];
        var commentsQuantity = getRandomNumber(1, COMMENTS_COUNT);
        var commentLength = getRandomNumber(1, 2);
        for (var i = 0; i < commentsQuantity; i++) {
            comments[i] = '';
            for (var j = 0; j < commentLength; j++) {
                comments[i] += ' ' + getRandomArrayElement(source);
            }
        }
        return comments;
    };

    window.generatePictureData = function(index) {
        return {
            url: 'photos/' + (index + 1) + '.jpg',
            likes: getRandomNumber(LIKES.min, LIKES.max),
            comments: generateRandomComment(COMMENTS_PATTERNS),
            description: DESCRIPTION_PATTERNS.randomElement()
        }
    };
})();