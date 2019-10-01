import Util from './utils.js';
import { Pictures } from './gallery.js';

const commentTemplate = document.querySelector('#comment-template').content;
const commentsContainer = document.querySelector('.social__comments');
const newCommentContainer = document.querySelector('.social__footer');
const newComment = newCommentContainer.querySelector('.social__footer-text');
const btnAddComment = newCommentContainer.querySelector('.social__footer-btn');

btnAddComment.addEventListener('click', () => {
    const commentsCount = document.querySelectorAll('.comments-count .comments-amount');
    const randomComments = Util.getRandomElement(Pictures).comments;
    const randomAvatar = Util.getRandomElement(randomComments.map(elem => elem.avatar));
    const comment = commentTemplate.querySelector('.social__comment').cloneNode(true);
    comment.querySelector('.social__picture').src = randomAvatar;
    comment.querySelector('.social__text').textContent = newComment.value;
    Array.prototype.forEach.call(commentsCount, amount => {
        amount.textContent++;
    });
    if (newComment.value) {
        commentsContainer.appendChild(comment);
    }
    newComment.value = '';
});