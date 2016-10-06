import {
  Component, OnInit, Input, EventEmitter, Output,
} from '@angular/core';

import {state,
  style, transition, animate, trigger,
  AnimationEntryMetadata
 } from '@angular/core';



 export default function(name:string, ini:number,
  end:number, delay:number):AnimationEntryMetadata[] {

  let nums:number[] = []
  for(let i=ini; i<end; i++) {
    nums.push(i);
  }
  //console.log(nums);
  //console.log(range);
  let out:any = [];
  nums.forEach((n) => {
    out.push(
      state('' + n, style({ transform: 'scale(1,1)' })),
      transition('void => ' + n, [
        style({ transform: 'scale(0,0)' }),
        animate('500ms ' + delay * n + 'ms ease-in')
      ]),
      transition(n + ' => void', [
        style({ transform: 'scale(1,1)' }),
        animate('500ms ' + delay * n + 'ms ease-in')
      ])

    );
  })
  //console.log(out);
  return [new AnimationEntryMetadata(name, out)];
}
