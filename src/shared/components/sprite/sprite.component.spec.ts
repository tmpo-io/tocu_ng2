

import { Step, steper$ } from './sprite.component';
import 'rxjs/add/operator/take';


declare const global: any;

describe('steper', () => {


let steps: Step[] = [
    [1, 100],
    [2, 200],
    [1, 300],
    [3, 100]
  ];

  it('should build a observable that emits, on step', () => {

    let res = steper$(steps);
    let sub = '';
    let index = 0;

    res.take(4).subscribe((n) => {
      sub += n;
      console.log(sub);
      expect(n).toBe(steps[index][0]);
      index++;
    });


  });


});
