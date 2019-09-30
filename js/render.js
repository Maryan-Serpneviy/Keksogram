const pictureTemplate = document.querySelector('#picture-template').content;

export default data => {
    const picture = pictureTemplate.querySelector('.picture__link').cloneNode(true);
    picture.querySelector('.picture__img').style.filter = data.filter;
    picture.querySelector('.picture__img').src = data.url;
    picture.querySelector('.picture__stat--likes').textContent = data.likes;
    picture.querySelector('.picture__stat--comments').textContent = data.comments.length;
    return picture;
};