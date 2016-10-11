import { Component, Output, OnInit,
    ViewChild, EventEmitter } from '@angular/core';

import { ImageResult } from '../../imagefield/interfaces';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

import { AuthService } from '../../../../auth';
import { ImageFieldComponent } from '../../imagefield/imagefield.component';


export interface Activitat {
  label: string
  id?: string
  image?: string
  file?: string
}


@Component({
  selector: 'add-activitat',
  templateUrl: './addactivitat.component.html',
  styleUrls: ['./addactivitat.component.scss']
})
export class AddActivitatComponent implements OnInit {

  public image: ImageResult;
  public paraula: string = "";
  public loading: boolean = false;
  public showAdd:boolean = false;

  @ViewChild(ImageFieldComponent) imgField;
  @Output() onCreate: EventEmitter<Activitat> = new EventEmitter<Activitat>()

  constructor(
    private af: AngularFire,
    private auth: AuthService) { }

  ngOnInit() {

  }

  imageSelected(event:ImageResult) {
    this.image = event;
  }

  save() {
    this.loading = true;
    const path = `users/${this.auth.id}/activitats`
    let storageRef = firebase.storage().ref();
    let db = firebase.database();
    let key = db.ref().child(path).push().key;
    let file = storageRef.child(`${path}/${key}.jpg`)

    let w:Activitat = {
      label: this.paraula,
      id: key,
      image: '',
      file: storageRef.child(`${path}/${key}.jpg`).fullPath
    }

    file.put(this.image.resized.blob).then(()=>{
      //console.log("Image uploaded");
      file.getDownloadURL().then(s=>{
        w.image = s;
        db.ref().child(path + "/" + key).update(w)
        this.loading = false;
        this.onCreate.next(w);
        this.resetForm();
      })
    })
  }

  resetForm() {
    this.imgField.clean();
    this.image = undefined;
    this.paraula = '';
  }


}
