'use strict';

class Timer {
  constructor(interval, removeTimer) {
    this.interval = interval;
    this.listeners = new Set();
    this.removeTimer = removeTimer;
    this.instance = setInterval(() => {
      for (const callback of this.listeners.values()) {
        callback();
      }
    }, interval);
  }

  listen(callback) {
    this.listeners.add(callback);
  }

  remove(callback) {
    this.listeners.delete(callback);
    if (this.listeners.size === 0) {
      clearInterval(this.instance);
      this.removeTimer(callback);
    }
  }
}

class TimerFactory {
  static timers = new Map();

  static getTimer(interval) {
    const removeTimer = (callback) => {
      TimerFactory.timers.delete(callback);
    };
    const timer = TimerFactory.timers.get(interval);
    if (timer) return timer;
    const instance = new Timer(interval, removeTimer);
    TimerFactory.timers.set(interval, instance);
    return instance;
  }
}

class Interval {
  constructor(msec, callback) {
    this.callback = callback;
    this.timer = TimerFactory.getTimer(msec);
    this.timer.listen(callback);
  }

  stop() {
    this.timer.remove(this.callback);
  }
}

// Usage

class Client {
  constructor(msec, count) {
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
