import { Component, OnDestroy } from '@angular/core';
import { animate, state, style, transition,
    trigger } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AngularFire,
  FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from '../../../auth';
import { Word } from '../../../models/word';

// import { staggered$ } from '../../../shared';

@Component({
  selector: 'app-creator-paraules',
  templateUrl: 'paraules.component.html',
  styleUrls: ['./paraules.component.scss'],
  animations: [
    trigger('in', [
      state('*', style({opacity: 0})),
      state('in', style({opacity: 1})),
      transition('* => in', animate(800)),
      transition('in => *', animate(100))
      ])
    ]
})
export class ParaulesComponent implements OnDestroy {

  closeResult: string;
  paraules$: FirebaseListObservable<any>;
  subscription: Subscription;

  paraules: Word[] = [];
  total: number = 0;
  current: number = 1;
  perPage: number = 10;
  addParaula: boolean = false;

  per$: Observable<any>;

  term = new FormControl();

  public bucket: string;

  constructor(
    private af: AngularFire,
    private auth: AuthService) {

    this.bucket = `users/${auth.id}/words`;
    this.paraules$ = af.database.list(this.bucket, {
      query: {
        orderByChild: 'key'
      }
    });
    this.subscription = this.paraules$.subscribe(l => {
      this.paraules = l.reverse();
      this.total = this.paraules.length;
      this.setQueryset(this.paraules.slice(0, 10));
    });

    this.term.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe(term => {
        if (term.length < 1) {
          this.setQueryset();
          this.current = 1;
          return;
        }
        let p = this.paraules.filter(
          v => new RegExp(term, 'gi').test(v.label));
        this.setQueryset(p);
      });
  }

  setQueryset(p?: Word[]) {
    if (!p) {
      p = this.paraules.slice(0, 10);
    }
    // this.per$ = staggered$(p, 100);
    this.per$ = Observable.of(p).delay(100);
  }

  changePage(event) {
    this.current = event;
    let ini = (this.current * this.perPage) - this.perPage;
    this.setQueryset(this.paraules.slice(ini, ini + this.perPage ));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  trackby(m: Word) {
    return m.id;
  }

}
