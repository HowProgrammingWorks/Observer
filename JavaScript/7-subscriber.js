'use strict';

class Observable {
  constructor(subscribe) {
    this.observers = [];
    this.operators = [];
    if (subscribe) setTimeout(subscribe, 0, this);
  }

  subscribe(observer) {
    this.observers.push(observer);
    return this;
  }

  pipe(...args) {
    this.operators.push(...args);
    const destination = new Observable();
    this.subscribe(data => destination.next(data));
    return destination;
  }

  next(data) {
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
}

const filter = predicate => ({ name: 'filter', fn: predicate });
const map = callback => ({ name: 'map', fn: callback });

// Usage

const randomChar = () => String
  .fromCharCode(Math.floor((Math.random() * 25) + 97));

const source = new Observable(subscriber => {
  setInterval(() => {
    const char = randomChar();
    subscriber.next(char);
  }, 200);
});

const destination = source.pipe(
  filter(char => !'aeiou'.includes(char)),
  map(char => char.toUpperCase())
);

let count = 0;

const observer = char => {
  process.stdout.write(char);
  count++;
  if (count > 50) {
    process.stdout.write('\n');
    process.exit(0);
  }
};

destination.subscribe(observer);

console.dir({ observer, source, destination });
