
import { Observable } from 'rxjs';




export function staggered$(list:any[], delay:number ):Observable<any> {

  return Observable.zip(
      Observable.from(list),
      Observable.interval(delay),
      (x,y) => x
    ).scan((acc,  x)=> acc.concat(x), [])
}
