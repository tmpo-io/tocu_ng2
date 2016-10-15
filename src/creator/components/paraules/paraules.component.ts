import { Component, OnInit } from '@angular/core';
import { AngularFire,
  FirebaseListObservable } from 'angularfire2';

import { FormControl } from '@angular/forms';

import { AuthService } from '../../../auth';

import { Word } from '../../../models';

@Component({
  selector: 'creator-paraules',
  templateUrl: 'paraules.component.html',
  styleUrls: ['./paraules.component.scss']

})
export class ParaulesComponent implements OnInit {

  closeResult: string;
  // public word:string = "lleó";
  paraules$:FirebaseListObservable<any>
  paraules:Word[] = [];
  resultparaules:Word[] = [];
  total:number = 0;

  term = new FormControl();

  public bucket:string;


  constructor(
    private af:AngularFire,
    private auth:AuthService) {

    this.bucket = `users/${auth.id}/words`;
    this.paraules$ = af.database.list(this.bucket);
    this.paraules$.subscribe(l=>{
      this.paraules = l;
      this.total = this.paraules.length;
      this.resultparaules = this.paraules.slice(0,10);
    })

    this.term.valueChanges
      .debounceTime(400)
      .subscribe(term => {
        if(term.length<1) {
          this.resultparaules = this.paraules.slice(0,10);
          return;
        }
        this.resultparaules = this.paraules
          .filter(v => new RegExp(term, 'gi').test(v.label))
      })
  }


  ngOnInit() { }
}
