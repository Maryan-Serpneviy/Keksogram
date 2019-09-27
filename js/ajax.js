import Const from './constants.js';

const statusBlock = document.querySelector('.ajax-status');
const statusMessage = document.querySelector('.ajax-status__message');
const statusClose = document.querySelector('.ajax-status__close');
let statusColor = null;

export default {
    request(onLoad, onError, url, method, status, data) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            let message = null;
            switch (xhr.status) {
                case 200:
                    onLoad(xhr.response);
                    message = `Data ${status}`;
                    break;
                case 400:
                    message = `Error! 400: Bad Request`;
                    break;
                case 401:
                    message = `Error! 401: User not authorized`;
                    break;
                case 404:
                    message = `Error! 404: Not found`;
                    break;
                case /5[0-9][0-9]/gm:
                    message = `Server connection timeout. Page will be reloaded`;
                    setTimeout(() => {
                        location.reload();
                    }, Const.TIMEOUT.RELOAD);
                    break;
                default:
                    message = `Response status: ${xhr.status} ${xhr.statusText}`;
            }
            xhr.status === 200 ? statusColor = Const.COLOR.SUCCESS : statusColor = Const.COLOR.DANGER;
            if (message) {
                onError(message);
            }
        });

        xhr.addEventListener('error', () => {
            this.errorHandler('Connection error');
        });

        xhr.addEventListener('timeout', () => {
            this.errorHandler(`Request did not manage to fulfill in ${xhr.timeout / 1000} s`);
        });
        xhr.timeout = Const.TIMEOUT.XHR;
        xhr.open(method, url);
        xhr.send(data);
    },
    load(onLoad, onError, status) {
        this.request(onLoad, onError, Const.API.LOAD, 'GET', status);
    },
    save(data, onLoad, onError, status) {
        this.request(onLoad, onError, Const.API.SAVE, 'POST', status, data);
    },
    statusHandler(status) {
        statusBlock.style = `visibility: visible; background-color: ${statusColor}`;
        statusMessage.textContent = `${status}`;
        statusClose.addEventListener('click', () => {
            statusBlock.style = Const.EFFECT.VANISH;
        });
        if (status.includes('Data')) {
            setTimeout(() => {
                statusBlock.style = Const.EFFECT.VANISH;
            }, Const.TIMEOUT.SUCCESS);
        }
    }
};