const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const userHashtags = document.querySelector('.text__hashtags');

const validateHashtags = arr => {
    let arrLowerCase = [];
    for (let i = 0; i < arr.length; i++) {
        arrLowerCase[i] = arr[i].toLowerCase();
    }
    userHashtags.setCustomValidity('');
    if (arr.length > MAX_HASHTAGS) {
        userHashtags.setCustomValidity(`Maximum of hashtags is: ${MAX_HASHTAGS}`);
    }
    if (!checkUniqueValues(arrLowerCase)) {
        userHashtags.setCustomValidity(`Same hashtag cannot be used twice (tags are not case sensitive).`);
    }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === '#') {
            userHashtags.setCustomValidity(`Hashtag cannot consist of just a lattice. Delete the extra character or add it.`);
        } else if (arr[i].charAt(0) !== '#') {
            userHashtags.setCustomValidity(`Hashtag ${arr[i]} must begin with "#".`);
        } else if (arr[i].slice(1).indexOf('#') !== -1) {
            userHashtags.setCustomValidity(`Hashtags ${arr[i]} must be separated by a space.`);
        } else if (arr[i].length > MAX_HASHTAG_LENGTH) {
            userHashtags.setCustomValidity(`The maximum length of one hashtag is 20 characters, including "#". Shorten your hashtag ${arr[i]}.`);
        }
    }
};

userHashtags.addEventListener ('input', () => {
    const hashtagsArr = userHashtags.value.split(' ');
    validateHashtags (hashtagsArr);
});