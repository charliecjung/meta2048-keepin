import * as util from '../util';

class KeyboardInputManager {
  constructor(move) {
    this.move = move;
    this.listen();
  }

  listen() {
    const { eventTouchstart, eventTouchmove, eventTouchend } = util.getTouchEventName;

    // Respond to direction keys
    document.addEventListener('keydown', (event) => {
      const modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
      const mapped = util.getKey(event.which);

      if (!modifiers) {
        if (mapped !== undefined) {
          event.preventDefault();
          this.move(mapped);
        }
      }

      // R key restarts the game
      if (!modifiers && event.which === 82) this.restart.call(this, event);
    });

    // Respond to swipe events
    let touchStartClientX;
    let touchStartClientY;
    const gameContainer = document.getElementsByClassName('game-container')[0];

    gameContainer.addEventListener(eventTouchstart, (event) => {
      if (
        (!window.navigator.msPointerEnabled && event.touches.length > 1)
        || event.targetTouches.length > 1
      ) {
        return; // Ignore if touching with more than 1 finger
      }

      if (window.navigator.msPointerEnabled) {
        touchStartClientX = event.pageX;
        touchStartClientY = event.pageY;
      } else {
        touchStartClientX = event.touches[0].clientX;
        touchStartClientY = event.touches[0].clientY;
      }

      event.preventDefault();
    });

    gameContainer.addEventListener(eventTouchmove, (event) => {
      event.preventDefault();
    });

    gameContainer.addEventListener(eventTouchend, (event) => {
      if (
        (!window.navigator.msPointerEnabled && event.touches.length > 0)
        || event.targetTouches.length > 0
      ) {
        return; // Ignore if still touching with one or more fingers
      }

      let touchEndClientX;
      let touchEndClientY;

      if (window.navigator.msPointerEnabled) {
        touchEndClientX = event.pageX;
        touchEndClientY = event.pageY;
      } else {
        touchEndClientX = event.changedTouches[0].clientX;
        touchEndClientY = event.changedTouches[0].clientY;
      }

      const dx = touchEndClientX - touchStartClientX;
      const absDx = Math.abs(dx);

      const dy = touchEndClientY - touchStartClientY;
      const absDy = Math.abs(dy);

      if (Math.max(absDx, absDy) > 10) {
        // (right : left) : (down : up)
        const dxRes = dx > 0 ? 1 : 3;
        const dyRes = dy > 0 ? 2 : 0;
        this.move(absDx > absDy ? dxRes : dyRes);
      }
    });
  }
}

export default KeyboardInputManager;
