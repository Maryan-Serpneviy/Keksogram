import Const from './constants.js';

const userHashtags = document.querySelector('.text__hashtags');

const validateHashtags = hashtagsArr => {
    const lowerCaseHashtags = hashtagsArr.map(element => element.toLowerCase());
    const uniqueHashtags = [...new Set(lowerCaseHashtags)];

    const isInvalid = () => {
        userHashtags.style.border = `2px solid ${Const.COLOR.DANGER}`;
        userHashtags.style.outline = 'none';
    };
    userHashtags.setCustomValidity('');
    hashtagsArr.forEach(element => {
        if (element === '#') {
            userHashtags.setCustomValidity(`Hashtag cannot consist of just a lattice. Delete the extra character or add it.`);
            isInvalid();
        } else if (element.charAt(0) !== '#') {
            userHashtags.setCustomValidity(`Hashtag ${element} must begin with "#".`);
            isInvalid();
        } else if (element.slice(1).indexOf('#') !== -1) {
            userHashtags.setCustomValidity(`Hashtags ${element} must be separated by white space.`);
            isInvalid();
        } else if (element.length > Const.HASHTAG.MAX_LENGTH) {
            userHashtags.setCustomValidity(`Maximum hashtag length of ${Const.HASHTAG.MAX_LENGTH} is exceeded. Shorten this hashtag: ${element}.`);
            isInvalid();
        }
    });
    if (hashtagsArr.length > Const.HASHTAG.MAX_AMOUNT) {
        userHashtags.setCustomValidity(`Maximum hashtags amount of ${Const.HASHTAG.MAX_AMOUNT} is exceeded`);
        isInvalid();
    }
    if (hashtagsArr.length !== uniqueHashtags.length) {
        userHashtags.setCustomValidity(`Same hashtag cannot be used twice (case is ignored).`);
        isInvalid();
    }
};

userHashtags.addEventListener('input', () => {
    const hashtagsArr = userHashtags.value.split(' ');

    userHashtags.style.border = 'none';
    userHashtags.style.outline = '5px auto -webkit-focus-ring-color';
    validateHashtags(hashtagsArr);
});