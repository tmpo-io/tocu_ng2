
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/defer';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';

import { getName } from '../shared/utils';

describe('dashboard', () => {

  class A {
    constructor(public should: boolean) {}
    $exists = () => this.should;
  }

  function keyExists(a: Observable<any>): Observable<boolean> {
    return a.switchMap(
      v => Observable.of(v.$exists())
    );
  }

  it('should resolve true if key exists', () => {
    let a = new A(true);
    let m = keyExists(Observable.of(a));
    m.subscribe((res) => {
      expect(res).toBe(true);
    });

  });

  it('should resolve false if key is false', () => {
    let a = new A(false);
    let m = keyExists(Observable.of(a));
    m.subscribe((res) => {
      expect(res).toBe(false);
    });
  });

  it('should retry till found a valid one', () => {
    const of = Observable.of;

    const list = [
      new A(false),
      new A(false),
      new A(true)
    ];

    let counter = 0;

    let res$ = Observable.defer(() => {
      return keyExists(of(list[counter++]));
    }).map(v => {
      if (v === false) {
        throw Error();
      }
      return true;
    }).retry();

    res$.subscribe((v) => {
      expect(counter).toBe(3);
      expect(v).toBe(true);
    });

  });


  it('should get the name part', () => {
    let e = getName('jordic@gmail.com');
    expect(e).toBe('jordic');
  });

});
