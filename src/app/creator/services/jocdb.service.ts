

import { Injectable, EventEmitter, NgZone } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AngularFire,
  FirebaseObjectObservable } from 'angularfire2';

// import * as firebase from 'firebase';

import { AuthService } from '../../auth';
import { Joc } from '../../models/joc';

let database = require('firebase/database');
let storage = require('firebase/storage');


interface UploadedFile {
  file?: string;
  image?: string;
  status?: boolean;
}

@Injectable()
export class JocDb {
  constructor(
    private af: AngularFire,
    private auth: AuthService,
    private zone: NgZone) {}

  gameExists(gameId: string): EventEmitter<boolean> {
    // console.log(this.getPath(authId, gameId))
    let ref = database().ref(this.getPath(gameId));
    let o = new EventEmitter<boolean>();
    ref.once('value', (snapshot) => this.zone.run(() => {
      let exists = (snapshot.val() !== null);
      o.next(exists);
    }));
    return o;
  }

  save(t: Joc, file?: Blob): Observable<Joc> {
    if (!t.id) {
      t.id = this.getNewId();
    }

    if (file) {
      return this.storeFile(t.id, file)
        .flatMap((result: UploadedFile) => {
          t.file = result.file;
          t.image = result.image;
          return this.saveObject(t);
        });
    }
    return this.saveObject(t);
  }


  remove(joc: Joc): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      let remove = () => {
        database().ref().child(this.getPath(joc.id))
        .remove();
      };
      // delete file
      if (joc.file) {
        let ref = storage().ref().child(joc.file);
        ref.delete().then(() => {
          remove();
          observer.next(true);
        }, () => {
          observer.next(false);
        });
      } else {
        remove();
        observer.next(true);
      }
    });
  }

  getJoc(gameId: string): FirebaseObjectObservable<Joc> {
    return this.af.database.object(this.getPath(gameId));
  }

  private storeFile(key, file): Observable<UploadedFile> {
    let result: UploadedFile = {};
    return new Observable<UploadedFile>(observer => {
      const ref = storage().ref().child(this.getPath(key) + '.png');
      result.file = ref.fullPath;
      ref.put(file).then(() => {
        ref.getDownloadURL().then(s => {
          result.image = s;
          observer.next(result);
          observer.complete();
        });
      });
    });
  }


  private saveObject(t: Joc): Observable<Joc> {
    return new Observable<Joc>( (obs) => {
      database().ref()
        .child(this.getPath(t.id))
        .update(t, () => this.zone.run(() => {
          obs.next(t);
          obs.complete();
        }));
    });
  }

  private getNewId(): string {
    return database().ref()
      .child(this.getPath()).push().key;
  }

  private getPath(id?: string): string {
    if (!id) {
      return `users/${this.auth.id}/jocs`;
    }
    return `users/${this.auth.id}/jocs/${id}`;
  }


}
