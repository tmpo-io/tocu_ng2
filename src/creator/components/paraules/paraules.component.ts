import { Component, OnInit } from '@angular/core';
import { AngularFire,
  FirebaseListObservable } from 'angularfire2';

import { AuthService } from '../../../auth';



@Component({
  selector: 'creator-paraules',
  templateUrl: 'paraules.component.html',
  styleUrls: ['./paraules.component.scss']

})
export class ParaulesComponent implements OnInit {

  closeResult: string;
  // public word:string = "lleó";

  paraules:FirebaseListObservable<any>;
  public bucket:string;

  constructor(
    private af:AngularFire,
    private auth:AuthService) {

    this.bucket = `users/${auth.id}/words`;
    this.paraules = af.database.list(this.bucket)


  }
  ngOnInit() { }
}
