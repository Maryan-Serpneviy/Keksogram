import Const from './constants.js';

const userHashtags = document.querySelector('.text__hashtags');

const validateHashtags = function(hashtagsArr) {
    const lowerCaseHashtags = hashtagsArr.map(element => element.toLowerCase());
    const uniqueHashtags = [...new Set(lowerCaseHashtags)];

    const isInvalid = () => {
        this.style.border = `2px solid ${Const.COLOR.DANGER}`;
        this.style.outline = 'none';
    };
    this.setCustomValidity('');
    hashtagsArr.forEach(element => {
        if (element === '#') {
            this.setCustomValidity(`Hashtag cannot consist of just a lattice. Delete the extra character or add it.`);
            isInvalid();
        } else if (element.charAt(0) !== '#') {
            this.setCustomValidity(`Hashtag ${element} must begin with "#".`);
            isInvalid();
        } else if (element.slice(1).indexOf('#') !== -1) {
            this.setCustomValidity(`Hashtags ${element} must be separated by white space.`);
            isInvalid();
        } else if (element.length > Const.HASHTAG.MAX_LENGTH) {
            this.setCustomValidity(`Maximum hashtag length of ${Const.HASHTAG.MAX_LENGTH} is exceeded. Shorten this hashtag: ${element}.`);
            isInvalid();
        }
    });
    if (hashtagsArr.length > Const.HASHTAG.MAX_AMOUNT) {
        this.setCustomValidity(`Maximum hashtags amount of ${Const.HASHTAG.MAX_AMOUNT} is exceeded`);
        isInvalid();
    }
    if (hashtagsArr.length !== uniqueHashtags.length) {
        this.setCustomValidity(`Same hashtag cannot be used twice (case is ignored).`);
        isInvalid();
    }
};

const validate = validateHashtags.bind(userHashtags);

userHashtags.addEventListener('input', function() {
    this.style.border = 'none';
    this.style.outline = '5px auto -webkit-focus-ring-color';
    validate(this.value.split(' '));
});