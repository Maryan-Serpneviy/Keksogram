var commentsArr = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография получше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография получше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var descriptionsArr = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка'
];

var fragment = document.createDocumentFragment();
var pictureTemplate = document.querySelector('#picture-template')
    .content
    .querySelector('.picture');
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

function createUniquesArr(n) {
    var uniquesArr = [];
    for (var i = 1; i <= n; i++) {
        uniquesArr.push(i);
    }
    return uniquesArr;
}

// shuffle array of unique numbers
function shuffle() {
    var array = createUniquesArr(25);
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function Thumb(url, likes, comments, description) {
    this.url = url;
    this.likes = likes;
    this.comments = comments;
    this.description = description;
}

function generateUrls() {
    var unique = shuffle();
    var urls = [];
    for (let i in unique) {
        urls.push('photos/' + unique[i] + '.jpg');
    }
    return urls;
}

function createThumbs() {
    var urls = generateUrls();
    var thumbs = [];

    function Thumb(url) {
        this.url = url;
    }
    for (let i in urls) {
        var obj = new Thumb(urls[i]);
        thumbs.push(obj);
    }
    return thumbs;
}

function completeThumbs(comments, description, thumbs) {
    var thumbs = thumbs;
    console.log(thumbs);
    for (let i in thumbs) {
        thumbs[i].likes = 15 + parseInt(Math.random() * 185);
        thumbs[i].comments = [comments.randomElement()];
        var commentRandomNum = parseInt(1 + Math.random() * 2);
        if (commentRandomNum > 1) {
            thumbs[i].comments.push(comments.randomElement());
        }
        thumbs[i].description = description.randomElement();
    }
    return thumbs;
}

var thumbs = completeThumbs(commentsArr, descriptionsArr, createThumbs());

function renderElement(data) {
    //var thumbs = completeThumbs(commentsArr, descriptionsArr, createThumbs());
    var thumbElement = pictureTemplate.cloneNode(true);
    for (let i in thumbs) {
        thumbElement.querySelector('img').src = thumbs[i].url;
        thumbElement.querySelector('.picture-likes').textContent = thumbs[i].likes;
        thumbElement.querySelector('.picture-comments').textContent = thumbs[i].comments.length;
    }
    return thumbElement;
}

function renderPictures() {
    var fragment = document.createDocumentFragment();

    for (let i = 0; i < 25; i++) {
        fragment.appendChild(renderElement(thumbs[i]));
    }
    picturesContainer.appendChild(fragment);
}
renderPictures();

/*
function renderElements() {
    // here urls are unique 
    var thumbs = completeThumbs(commentsArr, descriptionsArr, createThumbs());
    var thumbElements = [];
    var thumbElement = pictureTemplate.cloneNode(true);

    for (let i in thumbs) {
        thumbElement.querySelector('img').src = thumbs[i].url;
        thumbElement.querySelector('.picture-likes').textContent = thumbs[i].likes;
        thumbElement.querySelector('.picture-comments').textContent = thumbs[i].comments.length;
        thumbElements.push(thumbElement);
    }

    return thumbElements;
}

function renderPictures() {
    var fragment = document.createDocumentFragment();
    var elements = renderElements();

    for (let i = 0; i < elements.length; i++) {
        fragment.appendChild(elements[i]);
    }
    picturesContainer.appendChild(fragment);
}
renderPictures();
*/
