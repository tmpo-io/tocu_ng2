import { Component, OnInit } from '@angular/core';

import {
  AngularFire,
  FirebaseListObservable
} from 'angularfire2';

import * as firebase from 'firebase';
import { AuthService } from '../../../auth';


export interface TipusJoc {
  key:string
  desc:string
}


@Component({
  selector: 'creator-activitats',
  templateUrl: 'activitats.component.html'
})
export class ActivitatsComponent implements OnInit {

  activitats: FirebaseListObservable<any>;
  public bucket: string;
  public tipus:TipusJoc[] = [];

  constructor(private af: AngularFire,
    private auth: AuthService) {
    this.bucket = `users/${auth.id}/activitats`;
    this.activitats = af.database.list(this.bucket)
  }

  ngOnInit() {
    // Get available game types
    let db = firebase.database().ref("tipus")
    db.once("value").then(v => {
      const t = v.val();
      Object.keys(t).forEach(k => {
        this.tipus.push({
          key: k,
          desc: t[k].desc
        });
      })
      // console.log(this.tipus);
    })
  }

}
