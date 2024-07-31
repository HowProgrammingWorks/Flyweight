'use strict';

class Timer {
  constructor(interval) {
    this.interval = interval;
    this.listeners = new Set();
    this.instance = setInterval(() => {
      for (const callback of this.listeners.values()) {
        callback();
      }
    }, interval);
  }

  listen(callback) {
    this.listeners.add(callback);
  }
}

class TimerFactory {
  static timers = new Map();
  static getTimer(interval) {
    const timer = TimerFactory.timers.get(interval);
    if (timer) return timer;
    const instance = new Timer(interval);
    TimerFactory.timers.set(interval, instance);
    return instance;
  }
}

class Interval {
  constructor(msec, callback) {
    this.timer = TimerFactory.getTimer(msec);
    this.timer.listen(callback);
  }
}

// Usage

class Client {
  constructor(msec, count) {
    this.timers = [];
    for (let i = 0; i < count; i++) {
      new Interval(msec, () => {});
    }
  }
}

const client1 = new Client(1000, 1000000);
const client2 = new Client(2000, 1000000);
console.log({ client1, client2 });
const memory = process.memoryUsage();
console.log({ memory });
