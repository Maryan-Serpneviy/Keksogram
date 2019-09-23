export default {
    debounce: (() => {
        let lastTimeout = null;
        return (cb, s) => {
            const ms = s * 1000;
            clearTimeout(lastTimeout);
            lastTimeout = setTimeout(() => {
                cb()
            }, ms)
        };
    })()
};

Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
};

Array.prototype.getRandomUniques = function(amount) {
    const shuffle = arrayToShuffle => {
        const shuffledArray = Array.from(arrayToShuffle);
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };
    const uniquesArray = [...new Set(this)];
    const randomsArray = shuffle(uniquesArray);
    let limitedArray = [];
    for (let i = 0; i < amount; i++) {
        limitedArray.push(randomsArray[i]);
    }
    return limitedArray;
};