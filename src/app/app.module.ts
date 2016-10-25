
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';

import { AuthModule } from '../auth';
import { CreatorModule } from '../creator';
import { FirebaseModule } from '../firebase';
// import * as firebase from 'firebase'; firebaseConfig

import { GameModule } from '../game';

import { authReducer } from '../auth/reducers/login';


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
    NgbModule.forRoot(),
    StoreModule.provideStore({
      auth: authReducer
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
