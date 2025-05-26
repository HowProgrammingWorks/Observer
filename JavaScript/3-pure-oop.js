'use strict';

class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    observer.observable = this;
    this.observers.push(observer);
    return this;
  }

  notify(data) {
    if (this.observers.length === 0) return;
    for (const observer of this.observers) {
      observer.update(data);
    }
  }

  complete() {
    throw new Error('Observable.complete is not implemented');
  }
}

class Observer {
  update() {
    throw new Error('Observer.update is not implemented');
  }
}

const randomChar = () =>
  String.fromCharCode(Math.floor(Math.random() * 25 + 97));

class CharStream extends Observable {
  constructor(interval) {
    super();
    this.timer = setInterval(() => {
      const char = randomChar();
      this.notify(char);
    }, interval);
  }

  complete() {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
  }
}

class CharStreamObserver extends Observer {
  constructor() {
    super();
    this.count = 0;
    this.observable = null;
  }

  update(char) {
    process.stdout.write(char);
    this.count++;
    if (this.count > 50) {
      this.observable.complete();
      process.stdout.write('\n');
    }
  }
}

const observer = new CharStreamObserver();
const observable = new CharStream(200);
observable.subscribe(observer);
console.dir({ observer, observable });
