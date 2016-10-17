import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition,
    trigger } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularFire,
  FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';

import { AuthService } from '../../../auth';
import { Word } from '../../../models';

@Component({
  selector: 'creator-paraules',
  templateUrl: 'paraules.component.html',
  styleUrls: ['./paraules.component.scss'],
  animations: [
    trigger('in', [
      state("*", style({opacity: 0})),
      state("in", style({opacity: 1})),
      transition('* => in', animate(800))
      ])
    ]
})
export class ParaulesComponent implements OnInit {

  closeResult: string;
  // public word:string = "lleó";
  paraules$:FirebaseListObservable<any>
  paraules:Word[] = [];
  // resultparaules:Word[] = [];
  total:number = 0;
  current:number = 1;
  perPage:number = 10;

  per$:Observable<any>;

  term = new FormControl();

  public bucket:string;


  constructor(
    private af:AngularFire,
    private auth:AuthService) {

    this.bucket = `users/${auth.id}/words`;
    this.paraules$ = af.database.list(this.bucket, {
      query: {
        orderByChild: 'key'
      }
    });
    this.paraules$.subscribe(l=>{
      this.paraules = l;
      this.total = this.paraules.length;
      //this.resultparaules = this.paraules.slice(0,10);
      this.setQueryset(this.paraules.slice(0,10))
    })

    this.term.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(term => {
        if(term.length<1) {
          //this.resultparaules = this.paraules.slice(0,10);
          this.setQueryset();
          this.current = 1;
          return;
        }
        // this.resultparaules = this.paraules
        //   .filter(v => new RegExp(term, 'gi').test(v.label))
        let p = this.paraules.filter(
          v => new RegExp(term, 'gi').test(v.label))
        this.setQueryset(p)
      })
  }

  setQueryset(p?:Word[]) {
    if(!p) {
      p = this.paraules.slice(0,10);
    }
    this.per$ = Observable.zip(
        Observable.from(p),
        Observable.interval(100),
        (x,y) => x
      ).scan((acc,  x)=> acc.concat(x), [])
  }

  changePage(event) {
    this.current = event;
    let ini = (this.current*this.perPage) - this.perPage;
    this.setQueryset(this.paraules.slice(ini, ini+this.perPage ))
  }


  ngOnInit() { }
}
