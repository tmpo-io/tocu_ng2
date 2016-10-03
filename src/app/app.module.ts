
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// import { routing } from './app.routing';
import { AppComponent } from './app.component';

import { AuthModule } from '../auth';
import { CreatorModule } from '../creator';
import { FirebaseModule } from '../firebase';
import { GameModule } from '../game';


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
    FirebaseModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
