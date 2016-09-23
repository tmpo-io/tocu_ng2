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

import {
  MemoryService,
  SoundFXService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    MemoryCardComponent,
    MemoryBoardComponent,
    StarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    MemoryService,
    SoundFXService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
