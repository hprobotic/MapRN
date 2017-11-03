'use strict';

const React = require('React');
import Math from './Math';

it('Extract Anagram', () => {
  var keywords = ['hi', 'hello', 'bye', 'helol', 'abc', 'cab', 'bac', 5, {}, []],
  expect(Math._findAnagram(keywords)).toEqual(
    [['hi'], ['hello', 'helol'], ['bye'], ['abc', 'cab', 'bac']]
  );
});