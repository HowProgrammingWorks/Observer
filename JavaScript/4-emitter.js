'use strict';

const { EventEmitter } = require('node:events');

// Usage

const randomChar = () =>
  String.fromCharCode(Math.floor(Math.random() * 25 + 97));

class CharStream {
  // Observable
  constructor(ee, interval) {
    this.timer = setInterval(() => {
      const char = randomChar();
      ee.emit('char', char);
    }, interval);
  }

  complete() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  }
}

const ee = new EventEmitter();
const observable = new CharStream(ee, 200);

const createObserver = () => {
  let count = 0;
  return (char) => {
    process.stdout.write(char);
    count++;
    if (count > 50) {
      process.stdout.write('\n');
      process.exit(0);
    }
  };
};

const observer = createObserver();
ee.on('char', observer);

console.dir({ observer, observable });
