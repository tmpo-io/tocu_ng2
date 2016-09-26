
import 'rxjs/add/operator/combineLatest';
// import 'rxjs/observable/range';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MemoryCardComponent }
  from './memory/card/card.component';
import { MemoryBoardComponent }
  from './memory/board/board.component';
import { StarComponent }
  from './memory/stars/stars.component';
import { TiDialogComponent }
  from './shared/dialog/dialog.component';
import { MemorygameComponent }
  from './memory/game/memorygame.component';


import {
  WordsService,
  SoundFXService,
  ImageLoader } from './services';

@NgModule({
  declarations: [
    AppComponent,
    MemorygameComponent,
    MemoryCardComponent,
    MemoryBoardComponent,
    StarComponent,
    TiDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    WordsService,
    SoundFXService,
    ImageLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
