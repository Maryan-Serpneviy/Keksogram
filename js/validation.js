'use strict';

(function() {
    var MAX_HASHTAGS = 5;
    var MAX_HASHTAG_LENGTH = 20;
    var userHashtags = document.querySelector('.text__hashtags');

    var validateHashtags = function(arr) {
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
                userHashtags.setCustomValidity('Hashtag cannot consist of just a lattice. Delete the extra character or add it.');            
            } else if (arr[j].charAt(0) !== '#') {
                userHashtags.setCustomValidity('Hashtag ' + arr[j] + ' must begin with "#".');
            } else if (arr[j].slice(1).indexOf('#') !== -1) {
                userHashtags.setCustomValidity('Hashtags ' + arr[j] + ' must be separated by a space.');
            } else if (arr[j].length > MAX_HASHTAG_LENGTH) {
                userHashtags.setCustomValidity('The maximum length of one hashtag is 20 characters, including "#". Shorten your hashtag ' + arr[j] + '.');
            }
        }
    };
    
    userHashtags.addEventListener('input', function () {
        var hashtagsArr = userHashtags.value.split(' ');
        validateHashtags(hashtagsArr);
    });
})();