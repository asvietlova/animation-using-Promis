/**
 * @jest-environment jsdom
*/

const JestSnapshot = require('jest-snapshot');

const { getNewPos,
    isOnPlace,
    moveElement} = require('./2.js');

describe('isOnPlace', () => {
  test('must be True', () => {
    let currPos = { X: 0, Y: 100 };
    let endPos = { X: 0, Y: 100 };
    expect(isOnPlace(currPos, endPos)).toBe(true);
  });

  test('must be False', () => {
    let currPos = { X: 0, Y: 0 };
    let endPos = { X: 100, Y: 100 };
    expect(isOnPlace(currPos, endPos)).toBe(false);
  });
});

describe('getNewPos', () => {
test('vertical move', () => {
  let currPos = { X: 0, Y: 0 };
  let endPos = { X: 0, Y: 100 };
  let exp = { X: 0, Y: 1 };
  expect(getNewPos(currPos, endPos)).toEqual(exp)
});

test('horizontal move', () => {
  let currPos = { X: 0, Y: 0 };
  let endPos = { X: 100, Y: 0 };
  let exp = { X: 1, Y: 0 };
  expect(getNewPos(currPos, endPos)).toEqual(exp)
});

test('diagonal move', () => {
  let currPos = { X: 0, Y: 0 };
  let endPos = { X: 100, Y: 100 };
  let exp = { X: 1, Y: 1 };
  expect(getNewPos(currPos, endPos)).toEqual(exp)
});

test('should not move', () => {
  let currPos = { X: 100, Y: 100 };
  let endPos = { X: 100, Y: 100 };
  let exp = { X: 100, Y: 100 };
  expect(getNewPos(currPos, endPos)).toEqual(exp)
});
});

describe('moveElement', () => {
  let elem = document.createElement('div');
  let interval = 1;
  let endPos = { X: 13, Y: 12 };
  test('success', () => {
    return moveElement(elem, interval, endPos).then(() => {
      expect(elem.style.top).toEqual('12px');
      expect(elem.style.left).toEqual('13px');
    });
  });
});
