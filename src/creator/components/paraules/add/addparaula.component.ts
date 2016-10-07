import { Component, OnInit } from '@angular/core';
import { ImageResult } from '../../imagefield/interfaces';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

import { AuthService } from '../../../../auth';
import { Word } from '../../../../models';

@Component({
  selector: 'add-paraula',
  templateUrl: 'addparaula.component.html',
  styleUrls: ['./addparaula.component.scss']
})
export class AddParaulaComponent implements OnInit {

  public image:ImageResult
  public paraula:string = ""

  constructor(
    private af:AngularFire,
    private auth:AuthService) { }

  ngOnInit() { }

  imageSelected(event:ImageResult) {
    //console.log("Image changed", event);
    this.image = event;
  }

  save() {

    const path = `users/${this.auth.id}/words`


    let storageRef = firebase.storage().ref();
    let db = firebase.database();

    let key = db.ref().child(path).push().key;
    let file = storageRef.child(`${path}/${key}.jpg`)

    let w:Word = {
      label: this.paraula,
      id: key,
      image: file.fullPath,
      audio: ''
    }

    file.put(this.image.resized.blob).then(()=>{
      console.log("Image uploaded");
    })

    let updates = {};
    updates[path] = w;
    db.ref().update(updates);

    // let ref = this.af.database.list(path)
    // ref.push(w).then(o => {
    //   console.log("Item added", o.key);
    //   let file = storageRef.child(`${path}/${o.key}.jpg`);
    //   file.put(this.image.resized.blob).then(()=>{
    //     //console.log("upload complete");
    //   });
    // })


    //console.log("Inserted key", w.$key );

    //

    // console.log("Gained key from fb:", key);

    //this.af.database


  }

}
