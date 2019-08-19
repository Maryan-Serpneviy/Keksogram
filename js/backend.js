'use strict';

(function() {
    var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
    var SAVE_URL = 'https://js.dump.academy/kekstagram';

    window.backend = {
        request: function(onLoad, onError, url, method, data) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';

            xhr.addEventListener('load', function() {
                var error;
                switch (xhr.status) {
                    case 200:
                        onLoad(xhr.response);
                        break;
                    case 400:
                        error = '400: Bad Request';
                        break;
                    case 401:
                        error = '401: User not authorized';
                        break;
                    case 404:
                        error = '404: Not found';
                        break;
                    default:
                        error = 'Response status: ' + xhr.status + ' ' + xhr.statusText;
                }
                if (error) {
                    onError(error);
                }
            });
            xhr.addEventListener('error', function() {
                this.showErrorMessage('Connection error');
            });
            xhr.addEventListener('timeout', function() {
                this.showErrorMessage('Request did not manage to fulfill in' + (xhr.timeout / 1000) + ' s');
            });

            xhr.timeout = 10000;

            xhr.open(method, url);
            xhr.send(data);
        },
        load: function(onLoad, onError) {
            this.request(onLoad, onError, LOAD_URL, 'GET');
        },
        save: function(data, onLoad, onError) {
            this.request(onLoad, onError, SAVE_URL, 'POST', data);
        },
        showErrorMessage: function(errorMessage) {
            
        }
    };
})();