'use strict';

const randomChar = () => String
  .fromCharCode(Math.floor((Math.random() * 25) + 97));

const subscribe = observer => {
  const observable = { observer };
  const timer = setInterval(() => {
    const char = randomChar();
    observer(char);
  }, 200);
  observable.complete = () => clearInterval(timer);
  return observable;
};

// Usage

let count = 0;
const observable = subscribe(observer);

function observer(char) {
  process.stdout.write(char);
  count++;
  if (count > 50) {
    observable.complete();
    process.stdout.write('\n');
  }
}
