import { Component, Output, OnInit, OnDestroy,
    ViewChild, EventEmitter, ApplicationRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/delay';



import { AngularFire,
  FirebaseObjectObservable,
  FirebaseListObservable } from 'angularfire2';
import * as firebase from 'firebase';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';


import { JocDb } from '../../services';
import { AuthService } from '../../../auth';
import { ImageResult } from '../imagefield/interfaces';
import { ImageFieldComponent } from '../imagefield/imagefield.component';
import { Joc, tipusJoc, TJoc  } from './models'
import { Word } from '../../../models';


export function clean(obj) {
  delete obj.$key;
  delete obj.$exists;
  return obj;
}

@Component({
  selector: 'creator-jocs-edit',
  templateUrl: './jocedit.component.html',
  styleUrls: ['./jocedit.component.scss']
})
export class JocEditComponent implements OnInit, OnDestroy {

  public image: ImageResult;
  public paraula: string = "";
  public loading: boolean = false;
  public ready: boolean = false;

  private jocID:string;
  private joc$:FirebaseObjectObservable<Joc>;
  private subscription:Subscription;
  public joc:Joc = {
    label: '',
    words: []
  };

  private modified:boolean = false;

  public tipusJoc:TJoc[] = tipusJoc;

  private _paraules:FirebaseListObservable<Word[]>
  public paraules:Word[] = [];
  public selectedWords:Word[] = []

  // Suggest words
  public suggest:string = ''
  public showSuggest:boolean = false;

  public selectedWord:string;
  // public tipusJoc:FirebaseListObservable<TipusJoc[]>;

  @ViewChild(ImageFieldComponent) imgField;
  @Output() onCreate: EventEmitter<Joc> = new EventEmitter<Joc>()

  constructor(
    private af: AngularFire,
    private auth: AuthService,
    private route:ActivatedRoute,
    private router:Router,
    private db:JocDb,
    private appRef: ApplicationRef

    ) {
    }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      const p = params["id"];
      if(p == "add") {
        this.joc = {
           label: '',
           words: []
         };
         this.ready = true;
      } else {
        // Is edit.. load game instance
        this.jocID = params["id"];
        this.db.gameExists(this.jocID).subscribe(
          res => {
            if(res===false) {
              return this.router.navigate(['/creator/jocs']);
            }
            this._getGameData();
            this.ready = true;
          }
        )
      }
    })
    const path = `users/${this.auth.id}/words`
    this._paraules = this.af.database.list(path)
    this._paraules.subscribe(w=>{
      this.paraules = w;
    })
  }

  private _getGameData() {
    this.joc$ = this.db.getJoc(this.jocID);
    this.subscription = this.joc$.subscribe(o => {
      this.joc = clean(o);
      if(!this.joc.words) {
        this.joc.words = [];
      }
      // console.log("the game", this.joc);
    });
  }

  // aquesta funcio ha de ser una arrow, pq conservi el this
  // de la clase.
  searchWords = (text$:Observable<string>) => {
    return text$
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(term => {
        if(term=='') {
          this.suggest = '';
          return Observable.of([]);
        }
        // filtrem la llista de paraules coincidents amb el patró
        // pero eliminem les ja seleccionades
        let result = this.paraules.filter(
          v => new RegExp(term, 'gi').test(v.label)
        ).filter(el => {
          return (this.joc.words.find(k => k.id == el.id) == undefined)
        })
        // If there are no results sure is not an added word..
        if(result.length==0) {
          this.suggest = term;
        } else {
          this.suggest = '';
        }
        return Observable.of(result);
      })
  }

  delete() {
    let res = confirm("Estàs segur que vols esborrar el joc?")
    if(res) {
      this.db.remove(this.joc).subscribe(()=>{
         this.router.navigate(['/creator/jocs']);
      });
    }
  }

  wordFormater(result:Word):string {
    return result.label;
  }

  wordSelected(event:NgbTypeaheadSelectItemEvent) {
    this.selectedWord = "";
    if(!this.joc.words) {
      this.joc.words = []
    }
    this.modified = true
    this.joc.words.push(clean(event.item))
    event.preventDefault();
  };

  removeWord(w:Word) {
    this.modified = true;
    this.joc.words = this.joc.words.filter(el => w.id!=el.id)
  }

  imageSelected(event:ImageResult) {
    this.image = event;
    this.modified = true;
  }

  save() {
    this.loading = true;
    // console.log(this.image);
    let isInsert = (this.jocID==null)
    let b:Blob = (this.image) ? this.image.resized.blob : null;
    this.db.save(this.joc, b)
      .delay(200)
      .subscribe((r)=>{
        console.log("Saved", r)
        if(isInsert) {
          this.router.navigate(['/creator/jocs/'+r.id]);
        }
        this.loading = false;
        this.modified = false;
        this.appRef.tick();
        //console.log(this.loading, this.modified);
    })
  }

  createWord(word:Word) {
    this.joc.words.push(word)
    this.modified = true;
    this.showSuggest = false;
    this.suggest = '';
    this.selectedWord = "";
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
