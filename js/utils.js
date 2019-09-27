export default {
    debounce: (() => {
        let lastTimeout = null;
        return (cb, s) => {
            const ms = s * 1000;
            clearTimeout(lastTimeout);
            lastTimeout = setTimeout(() => {
                cb();
            }, ms);
        };
    })()
};

Array.prototype.shuffle = function() {
    for (var i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
};

Array.prototype.getRandomUniques = function(amount) {
    function shuffle(arrayToShuffle) {
        var shuffledArray = Array.from(arrayToShuffle);
        for (var i = shuffledArray.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    }
    var uniquesArray = [...new Set(this)];
    var randomsArray = shuffle(uniquesArray);
    var limitedArray = [];
    for (var i = 0; i < amount; i++) {
        limitedArray.push(randomsArray[i]);
    }
    return limitedArray;
};