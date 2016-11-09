

import { Step, steper$ } from './sprite.component';
import { TestScheduler } from 'rxjs/testing/TestScheduler';

const _ = require('lodash');

function stringify(x) {
  return JSON.stringify(x, function (key, value) {
    if (Array.isArray(value)) {
      return '[' + value
        .map(function (i) {
          return '\n\t' + stringify(i);
        }) + '\n]';
    }
    return value;
  })
    .replace(/\\"/g, '"')
    .replace(/\\t/g, '\t')
    .replace(/\\n/g, '\n');
}


let assertDeepEqual = (expected, values) => {
  if (!_.isEqual(expected, values)) {
    // console.log(expected);
    console.log(stringify(expected), stringify(values));
    throw new Error("expected not equal to values");
  } else {
    console.log("These are equal therefore no exception was thrown");
  }
}


declare const global: any;

describe('steper', () => {

  let steps: Step[] = [
    [1, 10],
    [2, 20],
    [1, 30],
    [3, 10]
  ];

  let scheduler = new TestScheduler(assertDeepEqual);

  it('should build a observable that emits, on step', () => {

    let res = steper$(steps, scheduler);
    const expected = '12-1--(3|)';
    scheduler.expectObservable(res).toBe(expected, [0, 1, 2, 3]);
    scheduler.flush();

  });


});
