import {
  Component, Output, OnInit, OnDestroy,
  ViewChild, EventEmitter, NgZone
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';


import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/delay';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import {
  AngularFire,
  FirebaseObjectObservable,
  FirebaseListObservable
}
  from 'angularfire2';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';


import { JocDb } from '../../services';
import { AuthService } from '../../../auth';
import { ImageResult } from '../imagefield/interfaces';
import { ImageFieldComponent } from '../imagefield/imagefield.component';
import { validateJoc, audioForWord } from './utils';


import {
  getDashboard,
  getWords
} from '../../../game/dashboard.reducers';
import { TJoc } from '../../../models/tjoc';
import { Joc } from '../../../models/joc';
import { tipusJoc } from '../../../models/tipusjoc';
import { Word } from '../../../models/word';
import { AppState } from '../../../models/app';
import { Dashboard } from '../../../models/dashboard';
import { DashboardActions } from '../../../game/dashboard.actions';
import { CreatorActions } from '../../creator.actions';


declare var Zone: any;


export function clean(obj) {
  delete obj.$key;
  delete obj.$exists;
  return obj;
}

@Component({
  selector: 'app-creator-jocs-edit',
  templateUrl: './jocedit.component.html',
  styleUrls: ['./jocedit.component.scss']
})
export class JocEditComponent implements OnInit, OnDestroy {

  public image: ImageResult;
  public paraula: string = '';
  public loading: boolean = false;
  public ready: boolean = false;

  private jocID: string;
  private joc$: FirebaseObjectObservable<Joc>;
  private subscription: Subscription;
  private wsubs: Subscription;
  public joc: Joc = {
    label: '',
    words: []
  };

  public uid: string;

  private modified: boolean = false;

  public tipusJoc: TJoc[] = tipusJoc;

  private _paraules: FirebaseListObservable<Word[]>;
  public paraules: Word[] = [];
  public selectedWords: Word[] = [];

  // Suggest words
  public suggest: string = '';
  public showSuggest: boolean = false;
  public selectedWord: string;

  public validateMsg: string;

  showParaules = true;

  @ViewChild(ImageFieldComponent) imgField;
  @Output() onCreate: EventEmitter<Joc> = new EventEmitter<Joc>()

  constructor(
    private af: AngularFire,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private db: JocDb,
    private zone: NgZone,
    private store: Store<AppState>,
    private modal: NgbModal

  ) {
  }

  ngOnInit() {
    this.route
      .params
      .switchMap((p: any) => {
        if (p.id === 'add') {
          return this.newGame();
        }
        return this.store
          .select(state => state.dashboard)
          .let(getDashboard(this.store))
          .map((das: Dashboard) => {
            let s = das.jocs.find(r => p.id === r.id);
            if (!s && das.loadData === 'ready') {
              this.router.navigate(['/activitat']);
              return null;
            }
            return s;
          });
      }).subscribe((j: Joc) => {
        if (j) {
          this.joc = clean(j);
          this.jocID = j.id;
          this.ready = true;
        }
      });

    this.store
      .select(state => state.dashboard)
      .let(getWords())
      .subscribe((w: Word[]) => {
        this.paraules = w;
      });

  }

  private newGame(): Observable<Joc> {
    return Observable.of({
      label: '',
      words: [],
      id: undefined
    });
  }



  // aquesta funcio ha de ser una arrow, pq conservi el this
  // de la clase.
  searchWords = (text$: Observable<string>) => {
    return text$
      .debounceTime(200)
      .distinctUntilChanged()
      .switchMap(term => {
        if (term === '') {
          this.suggest = '';
          return Observable.of([]);
        }
        // filtrem la llista de paraules coincidents amb el patró
        // pero eliminem les ja seleccionades
        let result = this.paraules.filter(
          v => new RegExp(term, 'gi').test(v.label)
        ).filter(el => {
          return (
            this.joc.words.find(k => k.id === el.id) === undefined);
        });
        // If there are no results sure is not an added word..
        if (result.length === 0) {
          this.suggest = term;
        } else {
          this.suggest = '';
        }
        return Observable.of(result);
      });
  }

  delete() {
    let res = confirm('Estàs segur que vols esborrar el joc?');
    if (res) {
      this.db.remove(this.joc).subscribe(() => {
        this.router.navigate(['/activitat']);
      });
    }
    this.store.dispatch(CreatorActions.deleteJoc(this.joc));
  }

  wordFormater(result: Word): string {
    return result.label;
  }

  wordSelected(event: NgbTypeaheadSelectItemEvent) {
    this.selectedWord = '';
    if (!this.joc.words) {
      this.joc.words = [];
    }
    this.modified = true;
    this.joc.words.push(clean(event.item));
    event.preventDefault();
  };

  updateWords(items: Word[]) {
    console.log('words:', items);
    this.joc.words = items.map(i => clean(i));
    this.modified = true;
  }

  removeWord(w: Word) {
    this.modified = true;
    this.joc.words = this.joc.words.filter(el => w.id !== el.id);
  }

  imageSelected(event: ImageResult) {
    this.image = event;
    this.modified = true;
  }

  save() {
    // Wait till audio is uploaded
    if (this.ensureWordsHasAudios() === false) {
      setTimeout(() => {
        this.save();
      }, 1000);
      return;
    }
    this.loading = true;
    // console.log(this.image);
    let isInsert = (this.jocID == null);
    let b: Blob = (this.image) ? this.image.resized.blob : null;
    this.db.save(this.joc, b)
      .subscribe((r) => {
        if (isInsert) {
          this.router.navigate(['/creator/jocs/' + r.id]);
        }
        this.loading = false;
        this.modified = false;
        this.store.dispatch(DashboardActions.loadData());
      });
  }

  ensureWordsHasAudios(): boolean {
    for (let i = 0; i < this.joc.words.length; i++) {
      if (this.joc.words[i].audio === '') {
        let x = this.joc.words[i];
        x.audio = audioForWord(x, this.paraules);
        if (x.audio === '') {
          return false;
        }
        this.joc.words[i] = x;
      }
    }
    return true;
  }

  createWord(word: Word) {
    this.joc.words.push(word);
    this.modified = true;
    this.showSuggest = false;
    this.suggest = '';
    this.selectedWord = '';
  }

  publish() {
    let result = validateJoc(this.joc);
    if (!result.status) {
      this.validateMsg = result.msg;
      return;
    }

    this.joc.published = true;
    this.loading = true;
    this.db.save(this.joc, null).subscribe((r) => {
      this.loading = false;
      this.modified = false;
    });

    this.store.dispatch(CreatorActions.updateJoc(this.joc));

  }

  unpublish() {
    this.joc.published = false;
    this.loading = true;
    this.db.save(this.joc, null).subscribe((r) => {
      this.loading = false;
      this.modified = false;
    });
    this.store.dispatch(CreatorActions.updateJoc(this.joc));

  }

  openParaules(content) {
    this.modal.open(content,
      { size: 'lg' }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.wsubs) {
      this.wsubs.unsubscribe();
    }
  }



}



// ngOnInit2() {
  //   this.uid = this.auth.id;
  //   this.route.params.subscribe(params => {
  //     const p = params['id'];
  //     if (p === 'add') {
  //       this.joc = {
  //         label: '',
  //         words: []
  //       };
  //       this.ready = true;
  //     } else {
  //       // @TODO convert to a route guard
  //       // Is edit.. load game instance
  //       this.jocID = params['id'];
  //       this.db.gameExists(this.jocID).subscribe(
  //         res => {
  //           if (res === false) {
  //             return this.router.navigate(['/activitat']);
  //           }
  //           this._getGameData();
  //           this.ready = true;
  //         }
  //       );
  //     }
  //   });
  //   const path = `users/${this.auth.id}/words`
  //   this._paraules = this.af.database.list(path)
  //   this.wsubs = this._paraules.subscribe(w => {
  //     this.paraules = w;
  //   });
  // }

  // private _getGameData() {
  //   // console.log("1", Zone.current.name);
  //   this.joc$ = this.db.getJoc(this.jocID);
  //   this.subscription = this.joc$.subscribe(o => this.zone.run(() => {
  //     // console.log("2", Zone.current.name);
  //     this.joc = clean(o);
  //     if (!this.joc.words) {
  //       this.joc.words = [];
  //     }
  //     // console.log("the game", this.joc);
  //   }));
  // }
