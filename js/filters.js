import Const from './constants.js';

const imgUpload = document.querySelector('.img-upload__overlay');
const scaleValue = imgUpload.querySelector('.scale__value');
const scaleLine = imgUpload.querySelector('.scale__line');
const scalePin = imgUpload.querySelector('.scale__pin');
const imgPreview = document.querySelector('.img__preview');
const effectsList = imgUpload.querySelector('.effects__list');

const Filter = {
    Chrome: '',
    Sepia: '',
    Marvin: '',
    Phobos: '',
    Heat: ''
};

// original photo (no effect) is selected by default
// this is needed for 'change' event to work properly
imgUpload.querySelector('.effects__radio').checked = true;

// store current filter on effect change
let currentFilter = null;

const setSaturation = () => {
    const scalePosition = scalePin.offsetLeft;
    const saturation = Math.round(scalePosition / Const.SCALE_LENGTH * 100);
    scaleValue.value = saturation; // set effect saturation into input field
    return saturation;
};

const updateFilter = update => {
    let imgFilters = '';
    for (const key in Filter) {
        if (Object.prototype.hasOwnProperty.call(Filter, key)) {
            if (update === '') {
                Filter[key] = '';
            }
            if (Filter[key].charAt(2) === update.charAt(2)) {
                Filter[key] = update;
            }
            imgFilters += Filter[key];
        }
    }
    return imgFilters;
};

const dynamicSaturation = function() {
    setSaturation();
    switch (currentFilter) {
        case 'chrome':
            Filter.Chrome = `grayscale(${scaleValue.value * Const.FILTERS_COEF.CHROME}) `;
            this.style.filter = updateFilter(`grayscale(${scaleValue.value * Const.FILTERS_COEF.CHROME}) `);
            break;
        case 'sepia':
            Filter.Sepia = `sepia(${scaleValue.value * Const.FILTERS_COEF.SEPIA}) `;
            this.style.filter = updateFilter(`sepia(${scaleValue.value * Const.FILTERS_COEF.SEPIA}) `);
            break;
        case 'marvin':
            Filter.Marvin = `invert(${scaleValue.value * Const.FILTERS_COEF.MARVIN}%) `;
            this.style.filter = updateFilter(`invert(${scaleValue.value * Const.FILTERS_COEF.MARVIN}%) `);
            break;
        case 'phobos':
            Filter.Phobos = `blur(${scaleValue.value * Const.FILTERS_COEF.PHOBOS}px) `;
            this.style.filter = updateFilter(`blur(${scaleValue.value * Const.FILTERS_COEF.PHOBOS}px) `);
            break;
        case 'heat':
            Filter.Heat = `brightness(${scaleValue.value * Const.FILTERS_COEF.HEAT}) `;
            this.style.filter = updateFilter(`brightness(${scaleValue.value * Const.FILTERS_COEF.HEAT}) `);
            break;
        default:
            this.style.filter = updateFilter('');
    }
};
const setFilter = dynamicSaturation.bind(imgPreview);

effectsList.addEventListener('change', evt => {
    currentFilter = evt.target.value;
    setFilter();
});
scaleLine.addEventListener('click', setFilter);

export { setSaturation, setFilter, imgPreview };