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

import { FxModule } from '../fx/fx.module';

import { TmpoTweenService } from './tween';
import { GlobusComponent } from './components/globus/globus.component';
import { StaggeredDirective } from './staggered.directive';


@NgModule({
  imports: [CommonModule, RouterModule, FxModule],
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
    GlobusComponent,
    StaggeredDirective
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
    GlobusComponent,
    StaggeredDirective,
  ],
  providers: [
    TmpoTweenService
  ],
})
export class SharedModule { }
