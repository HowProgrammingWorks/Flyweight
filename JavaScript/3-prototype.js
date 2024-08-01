'use strict';

class Interval {
  static timers = new Map();

  constructor(msec, callback) {
    this.callback = callback;
    const timer = Interval.timers.get(msec);
    if (timer) {
      Object.setPrototypeOf(this, timer);
    } else {
      this.listeners = new Set();
      this.instance = setInterval(() => {
        for (const callback of this.listeners.values()) {
          callback();
        }
      }, msec);
      Interval.timers.set(msec, this);
    }
    this.listeners.add(this.callback);
  }

  remove() {
    this.listeners.delete(this.callback);
    if (this.listeners.size === 0) {
      clearInterval(this.instance);
      Interval.timers.delete(this);
    }
  }
}

// Usage

const COUNT = 1000000;
for (let i = 0; i < COUNT; i++) {
  new Interval(1000, () => {});
  new Interval(2000, () => {});
}
const memory = process.memoryUsage();
console.log({ memory });
