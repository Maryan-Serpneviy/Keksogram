'use strict';

// BIG PICTURE
var imgContainer = document.querySelector('.pictures');
var bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');

var openBigPicture = function(evt) {
    var target = evt.target;
    if (target.className === 'picture__img') {
        var targetNum = target.src
        .substr(target.src.length - 6)
        .replace('/', '')
        .replace('.jpg', '') - 1;
        
        for (var i = 0; i < pictures.length; i++) {
            showBigPicture(pictures[targetNum]);
            bigPicture.classList.remove('hidden');
        }
    }    
};

var closeBigPicture = function() {
    bigPicture.classList.add('hidden');
};

var onBigPictureEscPress = function(evt) {
    if (evt.key === 'Escape') {
        closeBigPicture();
    }
};

imgContainer.addEventListener('click', openBigPicture);

bigPictureCloseBtn.addEventListener('click', closeBigPicture);

document.addEventListener('keydown', onBigPictureEscPress);

// UPLOAD
var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var imgUpload = document.querySelector('.img-upload__overlay');

var openFilters = function() {
    imgUpload.classList.remove('hidden');
};

var closeFilters = function() {
    imgUpload.classList.add('hidden');
    clearFileInputField('upload-file');    
};

var onFiltersEscPress = function(evt) {
    if (evt.key === 'Escape') {
        closeFilters();
    }
};

var clearFileInputField = function(Id) {
    document.getElementById(Id).innerHTML = document.getElementById(Id).innerHTML;
};

uploadFile.addEventListener('change', openFilters);

uploadCancel.addEventListener('click', closeFilters);

document.addEventListener('keydown', onFiltersEscPress);

// IMG FILTERS
var scaleLine = imgUpload.querySelector('.scale__line');
var scaleLevel = imgUpload.querySelector('.scale__level');
var scalePin = imgUpload.querySelector('.scale__pin');
var scaleValue = imgUpload.querySelector('.scale__value');

var getSaturationLevel = function() {
    var SCALE_LENGTH = 450;
    var scalePosition = scalePin.offsetLeft;
    var saturationLevel = scalePosition / SCALE_LENGTH * 100;
    scaleValue.value = saturationLevel;

    return saturationLevel;
};

scalePin.addEventListener('mouseup', getSaturationLevel);

var effects = Array.from(imgUpload.querySelectorAll('.effects__item'));
effects.forEach(function(elem) {
    elem.addEventListener('click', function() {
        scaleValue.value = 0;
    });
});

// VALIDATION
var MAX_HASHTAGS = 5;

var validateHashtags = function (arr) {
    var arrLowerCase = [];
    for (var i = 0; i < arr.length; i++) {
        arrLowerCase[i] = arr[i].toLowerCase();
    }
    userHashtags.setCustomValidity('');
    if (arr.length > MAX_HASHTAGS) {
        userHashtags.setCustomValidity('Maximum of hashtags is: ' + MAX_HASHTAGS);
    }
    if (!checkUniqueValues(arrLowerCase)) {
        userHashtags.setCustomValidity('Same hashtag cannot be used twice (tags are not case sensitive).');
    }
    for (var j = 0; j < arr.length; j++) {
        if (arr[j] === '#') {
            userHashtags.setCustomValidity('A hash tag cannot consist of just a lattice. Delete the extra character or add it.');            
        } else if (arr[j].charAt(0) !== '#') {
            userHashtags.setCustomValidity('Hashtag ' + arr[j] + ' must begin with "#".');
        } else if (arr[j].slice(1).indexOf('#') !== -1) {
            userHashtags.setCustomValidity('Hashtags ' + arr[j] + ' must be separated by a space.');
        } else if (arr[j].length > 20) {
            userHashtags.setCustomValidity('The maximum length of one hashtag is 20 characters, including "#". Shorten your hashtag ' + arr[j] + '.');
        }
    }
};
  
userHashtags.addEventListener('input', function () {
    var hashtagsArr = userHashtags.value.split(' ');
    validateHashtags(hashtagsArr);
});