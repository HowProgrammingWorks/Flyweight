'use strict';

class Interval {
  static timers = new Map();

  constructor(msec, callback) {
    let timer = Interval.timers.get(msec);
    if (!timer) {
      this.listeners = new Set();
      this.instance = setInterval(() => {
        for (const callback of this.listeners.values()) {
          callback();
        }
      }, msec);
      Interval.timers.set(msec, this);
      timer = this;
    }
    timer.listeners.add(callback);
  }

  remove(callback) {
    this.listeners.delete(callback);
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
