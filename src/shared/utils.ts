

// import { Observable } from 'rxjs/Observable';


export function cleanObject(obj) {
  delete obj.$key;
  delete obj.$exists;
  return obj;
}
