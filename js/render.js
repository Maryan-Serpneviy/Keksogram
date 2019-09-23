const pictureTemplate = document.querySelector('#picture-template').content;

export default data => {
    const thumbElement = pictureTemplate.querySelector('.picture__link').cloneNode(true);
    thumbElement.querySelector('.picture__img').src = data.url;
    thumbElement.querySelector('.picture__stat--likes').textContent = data.likes;
    thumbElement.querySelector('.picture__stat--comments').textContent = data.comments.length;
    return thumbElement;
};