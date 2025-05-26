'use strict';

class Observable {
  constructor() {
    this.observers = [];
    this.operators = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
    return this;
  }

  notify(data) {
    if (this.observers.length === 0) return;
    for (const operator of this.operators) {
      if (operator.name === 'filter') {
        if (!operator.fn(data)) return;
      }
      if (operator.name === 'map') {
        data = operator.fn(data);
      }
    }
    for (const observer of this.observers) {
      observer(data);
    }
  }

  filter(predicate) {
    this.operators.push({ name: 'filter', fn: predicate });
    return this;
  }

  map(callback) {
    this.operators.push({ name: 'map', fn: callback });
    return this;
  }
}

// Usage

const randomChar = () =>
  String.fromCharCode(Math.floor(Math.random() * 25 + 97));

const observable = new Observable()
  .filter((char) => !'aeiou'.includes(char))
  .map((char) => char.toUpperCase());

setInterval(() => {
  const char = randomChar();
  observable.notify(char);
}, 200);

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
observable.subscribe(observer);
