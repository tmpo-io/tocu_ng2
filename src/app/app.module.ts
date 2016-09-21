import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { MemoryCardComponent }
  from './memory/card/card.component';
import { MemoryBoardComponent }
  from './memory/board/board.component';

import { MemoryService } from './services';

@NgModule({
  declarations: [
    AppComponent,
    MemoryCardComponent,
    MemoryBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    MemoryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
