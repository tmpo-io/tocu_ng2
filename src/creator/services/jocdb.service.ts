

import { Injectable, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AngularFire,
  FirebaseObjectObservable,
  FirebaseListObservable } from 'angularfire2';

import * as firebase from 'firebase';

import { AuthService } from '../../auth';
import { Joc } from '../components/jocs/models';


interface uploadedFile {
  file?: string
  image?: string
  status?: boolean
}

@Injectable()
export class JocDb {


  constructor(
    private af: AngularFire,
    private auth: AuthService) {}

  gameExists(gameId:string):EventEmitter<boolean> {
    // console.log(this.getPath(authId, gameId))
    let ref = firebase.database().ref(this.getPath(gameId));
    let o = new EventEmitter<boolean>();
    ref.once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
      o.next(exists);
    });
    return o;
  }

  save(t:Joc, file?:Blob):Observable<Joc> {
    // console.log(t);
    if(!t.id) {
      t.id = this.getNewId();
    }
    if(file) {
      return new Observable<Joc>(obs=>{
        this.storeFile(t.id, file).subscribe(
          (result:uploadedFile) => {
            t.file = result.file;
            t.image = result.image;
            this.saveObject(t).subscribe((p)=>{
              obs.next(p);
              obs.complete();
            });
          }
        )
      });
    }
    return this.saveObject(t);
  }

  remove(joc:Joc):Observable<boolean> {
    return new Observable<boolean>((observer)=>{
      let remove = ()=>{
        firebase.database().ref().child(this.getPath(joc.id)).remove()
      }
      // delete file
      if(joc.file) {
        let ref = firebase.storage().ref().child(joc.file)
        ref.delete().then(()=>{
          remove()
          observer.next(true);
        }, ()=>{
          observer.next(false);
        })
      } else {
        remove();
        observer.next(true);
      }
    });
  }

  // public setState()

  getJoc(gameId:string):FirebaseObjectObservable<Joc> {
    return this.af.database.object(this.getPath(gameId));
  }

  private storeFile(key, file):Observable<uploadedFile> {
    let result:uploadedFile = {};
    return new Observable<uploadedFile>(
      (observer)=>{
        const ref = firebase.storage().ref().child(this.getPath(key) + ".png");
        result.file = ref.fullPath;
        ref.put(file).then(()=>{
          ref.getDownloadURL().then(s=>{
            result.image = s
            observer.next(result);
            observer.complete();
          })
        })
      });
  }

  private saveObject(t:Joc):Observable<Joc> {
    return new Observable<Joc>( (obs)=> {
        firebase.database().ref()
        .child(this.getPath(t.id))
        .update(t, ()=>{
          obs.next(t);
          obs.complete();
        })
      });
  }

  private getNewId():string {
    return firebase.database().ref()
      .child(this.getPath()).push().key
  }

  private getPath(id?:string):string {
    if(!id) {
      return `users/${this.auth.id}/jocs`;
    }
    return `users/${this.auth.id}/jocs/${id}`;
  }


}
