'use strict';

const randomChar = () =>
  String.fromCharCode(Math.floor(Math.random() * 25 + 97));

const subscribe = (observer) => {
  let timer = setInterval(() => {
    const char = randomChar();
    observer(char);
  }, 200);
  const unsubscribe = () => {
    if (!timer) return;
    clearInterval(timer);
    timer = null;
  };
  return { unsubscribe };
};

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
const observable = subscribe(observer);

console.dir({ observer, observable });
