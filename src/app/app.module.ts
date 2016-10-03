
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// import { routing } from './app.routing';
import { AppComponent } from './app.component';

import { GameModule } from '../game';
import { CreatorModule } from '../creator';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {useHash:false}),
    GameModule,
    CreatorModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
