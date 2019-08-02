'use strict';

var uploadFile = document.querySelector('#upload-file');
var uploadCancel = document.querySelector('#upload-cancel');
var imgUpload = document.querySelector('.img-upload__overlay');
var imgContainer = document.querySelector('.pictures');
var bigPictureCloseBtn = bigPicture.querySelector('.big-picture__cancel');

// UPLOAD
//imgUpload.classList.remove('hidden');

var closeImgUpload = function() {
    imgUpload.classList.add('hidden');
    clearFileInputField('upload-file');    
};

var clearFileInputField = function(Id) {
    document.getElementById(Id).innerHTML = document.getElementById(Id).innerHTML;
};

uploadFile.addEventListener('change', function () {
    imgUpload.classList.remove('hidden');
});

uploadCancel.addEventListener('click', function () {
    closeImgUpload();
});

document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
        closeImgUpload();
    }
});

// BIG PICTURE
var closeBigPicture = function() {
    bigPicture.classList.add('hidden');
};

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

imgContainer.addEventListener('click', openBigPicture);

bigPictureCloseBtn.addEventListener('click', closeBigPicture);

document.addEventListener('keydown', function(evt) {
    if (evt.key === 'Escape') {
        closeBigPicture();
    }
});




