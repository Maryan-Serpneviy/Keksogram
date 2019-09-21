export default {
    /**
     * Fisher–Yates shuffle algorithm
     * Shuffles array in place. ES6 version
     * @param {Array} a items An array containing the items.
     */
    shuffle (arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },
    getRandomUniqueArrayElements (sourceArray, amount) {
        const shuffle = arrayToShuffle => {
            const shuffledArray = Array.from(arrayToShuffle);
            for (let i = shuffledArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
            }
            return shuffledArray;
        };
        const uniquesArray = [...new Set(sourceArray)];
        const randomsArray = shuffle(uniquesArray);
        let limitedArray = [];
        for (let i = 0; i < amount; i++) {
            limitedArray.push(randomsArray[i]);
        }
        return limitedArray;
    }
}