'use strict';

(function() {
    const LOAD_URL = 'https://js.dump.academy/kekstagram/data';
    const SAVE_URL = 'https://js.dump.academy/kekstagram';

    window.backend = {
        request (onLoad, onError, url, method, data) {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'json';

            xhr.addEventListener('load', () => {
                let error;
                switch (xhr.status) {
                    case 200:
                        onLoad(xhr.response);
                        break;
                    case 400:
                        error = `400: Bad Request`;
                        break;
                    case 401:
                        error = `401: User not authorized`;
                        break;
                    case 404:
                        error = `404: Not found`;
                        break;
                    default:
                        error = `Response status: ${xhr.status} ${xhr.statusText}`;
                }
                if (error) {
                    onError(error);
                }
            });
            xhr.addEventListener('error', function() {
                this.errorHandler('Connection error');
            });
            xhr.addEventListener('timeout', function() {
                this.errorHandler(`Request did not manage to fulfill in ${xhr.timeout / 1000} s`);
            });

            xhr.timeout = 10000;

            xhr.open(method, url);
            xhr.send(data);
        },
        load (onLoad, onError) {
            this.request(onLoad, onError, LOAD_URL, 'GET');
        },
        save (data, onLoad, onError) {
            this.request(onLoad, onError, SAVE_URL, 'POST', data);
        },
        errorHandler (errorMessage) {
            const errorBlock = document.querySelector('.download-error');
            errorBlock.style = 'visibility: visible';
            document.querySelector('.download-error__message').textContent =  `Error! ${errorMessage}`;
            const errorClose = document.querySelector('.download-error__close')
            errorClose.addEventListener('click', () => {
                errorBlock.style = 'transform: scale(0); transition: all 0.3s ease';
            });            
        }
    };
})();