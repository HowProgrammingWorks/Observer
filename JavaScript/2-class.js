'use strict';

const randomChar = () => String
  .fromCharCode(Math.floor((Math.random() * 25) + 97));

class Observable {
  constructor() {
    this.timer = setInterval(() => {
      if (!this.onData) return;
      const char = randomChar();
      this.onData(char);
    }, 200);
  }
  subscribe(onData) {
    this.onData = onData;
    return this;
  }
  complete() {
    clearInterval(this.timer);
  }
}

// Usage

let count = 0;

const observable = new Observable().subscribe(observer);

function observer(char) {
  process.stdout.write(char);
  count++;
  if (count > 50) {
    observable.complete();
    process.stdout.write('\n');
  }
}
