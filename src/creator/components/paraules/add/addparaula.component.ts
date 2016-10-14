import { Component, Output, Input,
  OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ImageResult } from '../../imagefield/interfaces';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

import { AuthService } from '../../../../auth';
import { Word } from '../../../../models';
import { ImageFieldComponent } from '../../imagefield/imagefield.component';
import { AudioGenService } from '../../../services';


@Component({
  selector: 'add-paraula',
  templateUrl: 'addparaula.component.html',
  styleUrls: ['./addparaula.component.scss']
})
export class AddParaulaComponent implements OnInit {

  public image:ImageResult;

  @Input()
  paraula:string = "";
  public loading:boolean = false;

  @ViewChild(ImageFieldComponent) imgField;
  @Output() onCreate:EventEmitter<Word> = new EventEmitter<Word>()
  // private bucket:

  constructor(
    private af:AngularFire,
    private auth:AuthService,
    private audio:AudioGenService) { }

  ngOnInit() { }

  imageSelected(event:ImageResult) {
    this.image = event;
  }

  save() {

    this.loading = true;
    const path = `users/${this.auth.id}/words`
    let storageRef = firebase.storage().ref();
    let db = firebase.database();
    let key = db.ref().child(path).push().key;
    let file = storageRef.child(`${path}/${key}.jpg`)

    let w:Word = {
      label: this.paraula,
      id: key,
      image: '',
      audio: '',
      file: storageRef.child(`${path}/${key}.jpg`).fullPath
    }

    file.put(this.image.resized.blob).then(()=>{
      //console.log("Image uploaded");
      file.getDownloadURL().then(s=>{
        w.image = s;
        db.ref().child(path + "/" + key).update(w)
          .then((m)=>{
            this.audio.createAudio(this.auth.id, key, w.label);
          });
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
