import { Component, OnInit } from '@angular/core';

import {
  AngularFire,
  FirebaseListObservable
} from 'angularfire2';

import * as firebase from 'firebase';
import { AuthService } from '../../../auth';



@Component({
  selector: 'creator-jocs',
  templateUrl: 'jocslist.component.html',
  styleUrls: ['./joclist.component.scss']
})
export class JocsListComponent implements OnInit {

  activitats: FirebaseListObservable<any>;
  bucket: string;

  constructor(private af: AngularFire,
    private auth: AuthService) {
    this.bucket = `users/${auth.id}/jocs`;
    this.activitats = af.database.list(this.bucket)
  }

  ngOnInit() {
  }

}
