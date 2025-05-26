'use strict';

const randomChar = () =>
  String.fromCharCode(Math.floor(Math.random() * 25 + 97));

class Observable {
  constructor(interval) {
    this.observer = null;
    this.timer = setInterval(() => {
      if (!this.observer) return;
      const char = randomChar();
      this.observer(char);
    }, interval);
  }

  subscribe(observer) {
    this.observer = observer;
    return this;
  }

  unsubscribe() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  }
}

// Usage

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
const observable = new Observable(200);
observable.subscribe(observer);

console.dir({ observer, observable });
