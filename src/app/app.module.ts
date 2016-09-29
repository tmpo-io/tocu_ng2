import 'rxjs/add/operator/combineLatest';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { AppComponent } from './app.component';

import { StarComponent }
  from './shared/stars/stars.component';
import { TiDialogComponent }
  from './shared/dialog/dialog.component';
import { GameComponent }
  from './shared/game/game.component';
import { PointsComponent }
  from './shared/points/points.component';
import { TimerComponent }
  from './shared/timer/timer.component';


import { MemoryCardComponent, MemoryBoardComponent } from './memory';
import {
  SequencingBoardComponent,
  SequencingWordComponent,
  SequencingLetterComponent
} from './sequencing';

import {
  WordsService,
  SoundFXService,
  ImageLoader } from './services';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    MemoryCardComponent,
    MemoryBoardComponent,
    SequencingBoardComponent,
    SequencingWordComponent,
    SequencingLetterComponent,
    StarComponent,
    TiDialogComponent,
    PointsComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    WordsService,
    SoundFXService,
    ImageLoader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
