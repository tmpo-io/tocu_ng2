

import { Observable } from 'rxjs/Observable';


export function cleanObject(obj) {
  delete obj.$key;
  delete obj.$exists;
  return obj;
}

export function getName(email: string): string {
  return (email.split('@'))[0];
}

export function keyExists() {
  return $state =>
    $state.switchMap(j => Observable.of(j.$exists()));
}
