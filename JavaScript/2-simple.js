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
}

// Usage

class Client {
  constructor(msec, count) {
    this.timers = [];
    for (let i = 0; i < count; i++) {
      new Interval(msec, () => {}, msec);
    }
  }
}

const client1 = new Client(1000, 1000000);
const client2 = new Client(2000, 1000000);
console.log({ client1, client2 });
const memory = process.memoryUsage();
console.log({ memory });
