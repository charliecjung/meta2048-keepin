function getVector(direction) {
  const map = {
    0: { x: 0, y: -1 }, // Up
    1: { x: 1, y: 0 }, // Right
    2: { x: 0, y: 1 }, // Down
    3: { x: -1, y: 0 }, // Left
  };

  return map[direction];
}

function getTouchEventName() {
  const { msPointerEnabled } = window.navigator;
  const eventTouchstart = msPointerEnabled ? 'MSPointerDown' : 'touchstart';
  const eventTouchmove = msPointerEnabled ? 'MSPointerMove' : 'touchmove';
  const eventTouchend = msPointerEnabled ? 'MSPointerUp' : 'touchend';

  return { eventTouchstart, eventTouchmove, eventTouchend };
}

function getKey(event) {
  const map = {
    38: 0, // Up
    39: 1, // Right
    40: 2, // Down
    37: 3, // Left
    75: 0, // Vim up
    76: 1, // Vim right
    74: 2, // Vim down
    72: 3, // Vim left
    87: 0, // W
    68: 1, // D
    83: 2, // S
    65: 3, // A
  };

  return map[event];
}

function addBtnTouchListner(button) {
  if (!button) return;
  const { eventTouchend } = getTouchEventName();
  button.addBtnTouchListner(eventTouchend, (event) => {
    event.preventDefault();
    event.target.click();
  });
}

export {
  getVector, getTouchEventName, getKey, addBtnTouchListner,
};
