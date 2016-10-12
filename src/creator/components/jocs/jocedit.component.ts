import { Component, Output, OnInit,
    ViewChild, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { AngularFire,
  FirebaseObjectObservable,
  FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../../../auth';
import { ImageResult } from '../imagefield/interfaces';
import { ImageFieldComponent } from '../imagefield/imagefield.component';
import { Joc, tipusJoc, TJoc  } from './models'
import { Word } from '../../../models';




export let para:Word[];

@Component({
  selector: 'creator-jocs-edit',
  templateUrl: './jocedit.component.html',
  styleUrls: ['./jocedit.component.scss']
})
export class JocEditComponent implements OnInit {

  public image: ImageResult;
  public paraula: string = "";
  public loading: boolean = false;

  private jocID:string;
  private joc$:FirebaseObjectObservable<Joc>;
  public joc:Joc = {};
  private modifed:boolean;
  public tipusJoc:TJoc[] = tipusJoc;
  private _paraules:FirebaseListObservable<Word[]>
  public paraules:Word[] = [];
  public selectedWords:Word[] = []

  public selectedWord:string;
  // public tipusJoc:FirebaseListObservable<TipusJoc[]>;

  @ViewChild(ImageFieldComponent) imgField;
  @Output() onCreate: EventEmitter<Joc> = new EventEmitter<Joc>()

  constructor(
    private af: AngularFire,
    private auth: AuthService,
    private route:ActivatedRoute) {
    }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      if(params) {
        // Is edit.. load game instance
        this.jocID = params["id"];
        this.joc$ = this.af.database.object(this.getPath(this.jocID));
        this.joc$.subscribe(obj=>{
          this.joc = obj;
        });
       } else {
         this.joc = {
           label: ''
         };
       }
    })
    const path = `users/${this.auth.id}/words`
    this._paraules = this.af.database.list(path)
    this._paraules.subscribe(w=>{
      this.paraules = w;
      para = this.paraules;
      // console.log("Paraules", this.paraules)
    })
    // this.tipusJoc = this.af.database.list("tipus");
  }

  // aquesta funcio ha de ser una arrow, pq conservi el this
  // de la clase.
  searchWords = (text$:Observable<string>) => {
    return text$
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(term => {
        if(term=='') {
          return Observable.of([]);
        }
        // filtrem la llista de paraules coincidents amb el patró
        // pero eliminem les ja seleccionades
        return Observable.of(
          this.paraules.filter(
            v=>new RegExp(term, 'gi').test(v.label)
          ).filter(el=>{
            return (this.selectedWords.find(k=>k.id==el.id)==undefined)
          })
        );
      })
  }

  wordFormater(result:Word):string {
    return result.label;
  }

  wordSelected(event:NgbTypeaheadSelectItemEvent) {
    this.selectedWord = "";
    this.selectedWords.push(event.item);
    event.preventDefault();
  }

  removeWord(w:Word) {
    this.selectedWords = this.selectedWords.filter(el => w.id!=el.id)
  }

  imageSelected(event:ImageResult) {
    this.image = event;
  }

  save() {
    this.loading = true;
    const path = `users/${this.auth.id}/jocs`
    let storageRef = firebase.storage().ref();
    let db = firebase.database();
    let key = db.ref().child(path).push().key;
    let file = storageRef.child(`${path}/${key}.jpg`)

    let w:Joc = {
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

  private getPath(id:string):string {
    return `users/${this.auth.id}/jocs/${id}`
  }

  resetForm() {
    this.imgField.clean();
    this.image = undefined;
    this.paraula = '';
  }


}
