'use strict';

const randomChar = () => String
  .fromCharCode(Math.floor((Math.random() * 25) + 97));

class Observable {
  constructor() {
    this.observer = null;
    setInterval(() => {
      if (!this.observer) return;
      const char = randomChar();
      this.observer(char);
    }, 200);
  }

  subscribe(observer) {
    this.observer = observer;
    return this;
  }
}

// Usage

let count = 0;

const observer = char => {
  process.stdout.write(char);
  count++;
  if (count > 50) {
    process.stdout.write('\n');
    process.exit(0);
  }
};

const observable = new Observable().subscribe(observer);

console.dir({ observer, observable });
