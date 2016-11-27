import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TiPreloadComponent }   from './components/preload/preload.component';
import { TiGameListComponent } from './components/gamelist/gamelist.component';
import { BallonsComponent } from './components/balloons/balloons.component';
import { ButtonComponent } from './components/button/button.component';
import { PointsComponent } from './components/points/points.component';
import { StarComponent } from './components/stars/stars.component';
import { TiDialogComponent } from './components/dialog/dialog.component';
import { TimerComponent } from './components/timer/timer.component';
import { TiSpriteComponent } from './components/sprite/sprite.component';
import { TiCanvasExplosionComponent } from
  './components/canvasexplosion/canvasexplosion.component';
import { CardComponent } from './components/card/card.component';
import { WordprogressComponent } from './components/wordprogress/wordprogress.component';



@NgModule({
  imports: [CommonModule, RouterModule],
  exports: [
    TiPreloadComponent,
    TiGameListComponent,
    BallonsComponent,
    ButtonComponent,
    PointsComponent,
    StarComponent,
    TiDialogComponent,
    TimerComponent,
    TiSpriteComponent,
    TiCanvasExplosionComponent,
    CardComponent,
    WordprogressComponent,
  ],
  declarations: [
    TiPreloadComponent,
    TiGameListComponent,
    BallonsComponent,
    ButtonComponent,
    PointsComponent,
    StarComponent,
    TiDialogComponent,
    TimerComponent,
    TiSpriteComponent,
    TiCanvasExplosionComponent,
    CardComponent,
    WordprogressComponent,
  ],
  providers: [],
})
export class SharedModule { }
