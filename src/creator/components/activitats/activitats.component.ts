import { Component, OnInit } from '@angular/core';

import {
  AngularFire,
  FirebaseListObservable
} from 'angularfire2';

import { AuthService } from '../../../auth';


@Component({
  selector: 'creator-activitats',
  templateUrl: 'activitats.component.html'
})
export class ActivitatsComponent implements OnInit {

  activitats: FirebaseListObservable<any>;
  public bucket: string;

  constructor(private af: AngularFire,
    private auth: AuthService) {
    this.bucket = `users/${auth.id}/activitats`;
    this.activitats = af.database.list(this.bucket)
  }



  ngOnInit() { }

}
