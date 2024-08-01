'use strict';

// Note: this implementation is good for JavaScript culture
// but it is not Flyweight (GoF Patterns) implementation

const timers = new Map();

const free = ({ listeners, instance }) => (callback) => {
  listeners.delete(callback);
  if (listeners.size === 0) {
    clearInterval(instance);
    timers.delete(this);
  }
};

const interval = (msec, callback) => {
  let timer = timers.get(msec);
  if (timer) return timer;
  const listeners = new Set();
  const instance = setInterval(() => {
    timer.listeners.forEach((callback) => callback());
  }, msec);
  timer = { listeners, instance };
  timers.set(msec, timer);
  listeners.add(callback);
  return Object.assign(timer, { remove: free(timer) });
};

module.exports = interval;
