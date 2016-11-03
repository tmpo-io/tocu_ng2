import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TiPreloadComponent }   from './components/preload/preload.component';
import { TiGameListComponent } from './components/gamelist/gamelist.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [
    TiPreloadComponent,
    TiGameListComponent
  ],
  declarations: [
    TiPreloadComponent,
    TiGameListComponent
  ],
  providers: [],
})
export class SharedModule { }
