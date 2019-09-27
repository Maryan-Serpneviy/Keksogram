import { getSaturation, dynamicSaturation } from './filters.js';

const imgUpload = document.querySelector('.img-upload__overlay');
const scale = imgUpload.querySelector('.scale');
const scaleValue = imgUpload.querySelector('.scale__value');
const scaleLine = imgUpload.querySelector('.scale__line');
const scalePin = imgUpload.querySelector('.scale__pin');
const scaleLevel = imgUpload.querySelector('.scale__level');

const getPinPosition = (coord, shift) => {
    const SCALE_OVERFLOW = 45;
    const SCALE_LIMITS = {
        min: 0,
        max: scale.offsetWidth - SCALE_OVERFLOW
    };
    let pinPosition = '';
    if (coord > scaleLine.getBoundingClientRect().right) {
        pinPosition = `${SCALE_LIMITS.max}px`;
    } else if (coord < scaleLine.getBoundingClientRect().left) {
        pinPosition = `${SCALE_LIMITS.min}px`;
    } else {
        pinPosition = `${scalePin.offsetLeft - shift}px`;
    }
    return pinPosition;
};

scalePin.addEventListener('mousedown', evt => {
    evt.preventDefault();
    let coord = evt.clientX;
    const onMouseMove = moveEvt => {
        moveEvt.preventDefault();
        const shift = coord - moveEvt.clientX;
        coord = moveEvt.clientX;
        const pinPosition = getPinPosition(coord, shift);
        scalePin.style.left = pinPosition;
        scaleLevel.style.width = pinPosition;
        window.pinPosition = pinPosition;
        // dynamic change of effect saturation
        dynamicSaturation();
    };
    const onMouseUp = upEvt => {
        upEvt.preventDefault();
        scalePin.style.left = pinPosition;
        scaleLevel.style.width = pinPosition;
        scaleValue.value = getSaturation();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

scaleLine.addEventListener('mouseup', evt => {
    evt.preventDefault();
    scalePin.style.left = `${evt.offsetX}px`;
    scaleLevel.style.width = `${evt.offsetX}px`;
});