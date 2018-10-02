//https://gist.githubusercontent.com/davidgilbertson/0377b00b31afc4ac7c9bbb9b8706cca7/raw/ff81c7332d8ec6725ec6749d7459268b82a821b6/elementIdCreator.js

let count = 1;

export const resetId = () => {
  count = 1;
};

export const getNextId = () => {
  return `element-id-${count++}`;
};