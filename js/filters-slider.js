window.imgUpload.classList.remove('hidden');

var scale = imgUpload.querySelector('.scale');
var scaleLine = imgUpload.querySelector('.scale__line');
var scalePin = imgUpload.querySelector('.scale__pin');
var scaleLevel = imgUpload.querySelector('.scale__level');

var getPinPosition = function(coord, shift) {
    var SCALE_OVERFLOW = 45;
    var SCALE_LIMITS = {
        min: 0,
        max: scale.offsetWidth - SCALE_OVERFLOW
    };
    var pinPosition = '';
    if (coord > scaleLine.getBoundingClientRect().right) {
        pinPosition = SCALE_LIMITS.max + 'px';
    } else if (coord < scaleLine.getBoundingClientRect().left) {
        pinPosition = SCALE_LIMITS.min + 'px';
    } else {
        pinPosition = (scalePin.offsetLeft - shift) + 'px';
    }
    return pinPosition;
};

scalePin.addEventListener('mousedown', function(evt) {
    evt.preventDefault();
    var coord = evt.clientX;
    
    var onMouseMove = function(moveEvt) {
        moveEvt.preventDefault();
        var shift = coord - moveEvt.clientX;
        coord = moveEvt.clientX;

        var pinPosition = getPinPosition(coord, shift);
        scalePin.style.left = pinPosition;
        scaleLevel.style.width = pinPosition;
        window.pinPosition = pinPosition;
    };

    var onMouseUp = function(upEvt) {
        upEvt.preventDefault();
        scalePin.style.left = window.pinPosition;
        scaleLevel.style.width = window.pinPosition;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

scaleLine.addEventListener('mouseup', function(evt) {
    evt.preventDefault();
    scalePin.style.left = evt.offsetX + 'px';
    scaleLevel.style.width = evt.offsetX + 'px';
});