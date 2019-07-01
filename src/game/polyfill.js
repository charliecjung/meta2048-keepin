/* eslint-disable */
const animframe = () => {
  let lastTime = 0;
  const vendors = ['webkit', 'moz'];
  for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[`${vendors[x]}RequestAnimationFrame`];
    window.cancelAnimationFrame =
      window[`${vendors[x]}CancelAnimationFrame`] ||
      window[`${vendors[x]}CancelRequestAnimationFrame`];
  }

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function(callback) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
  }
};

const classlist = () => {
  if (typeof window.Element === 'undefined' || 'classList' in document.documentElement) {
    return;
  }

  class DOMTokenList extends Array {
    constructor(_el) {
      super();
      this.el = _el;
      const classes = _el.className.replace(/^\s+|\s+$/g, '').split(/\s+/);
      for (let i = 0; i < classes.length; i++) {
        super.push.call(this, classes[i]);
      }
    }

    add(token) {
      if (this.contains(token)) return;
      super.push.call(this, token);
      this.el.className = this.toString();
    }

    contains(token) {
      return this.el.className.indexOf(token) !== -1;
    }

    item(index) {
      return this[index] || null;
    }

    remove(token) {
      if (!this.contains(token)) return;
      for (var i = 0; i < this.length; i++) {
        if (this[i] === token) break;
      }
      super.splice.call(this, i, 1);
      this.el.className = this.toString();
    }

    toString() {
      return super.join.call(this, ' ');
    }

    toggle(token) {
      if (!this.contains(token)) {
        this.add(token);
      } else {
        this.remove(token);
      }

      return this.contains(token);
    }
  }
  window.DOMTokenList = DOMTokenList;

  function defineElementGetter(obj, prop, getter) {
    if (Object.defineProperty) {
      Object.defineProperty(obj, prop, {
        get: getter,
      });
    } else {
      obj.__defineGetter__(prop, getter);
    }
  }

  defineElementGetter(HTMLElement.prototype, 'classList', function() {
    return new DOMTokenList(this);
  });
};

export { animframe, classlist };
