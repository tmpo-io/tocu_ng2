
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { AuthModule } from '../auth';
import { CreatorModule } from '../creator';
import { FirebaseModule, firebaseConfig } from '../firebase';
import * as firebase from 'firebase';

import { GameModule } from '../game';


firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {useHash:false}),
    AuthModule,
    GameModule,
    CreatorModule,
    FirebaseModule,
    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
