import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';


import {
  ButtonComponent,
  GameComponent,
  PointsComponent,
  StarComponent,
  BallonsComponent,
  TiDialogComponent,
  TimerComponent
  } from './shared';

import { ActivitatComponent } from './activitat';
import {
  MemoryCardComponent,
  MemoryBoardComponent
  } from './memory';
import {
  SequencingBoardComponent,
  SequencingWordComponent,
  SequencingLetterComponent
  } from './sequencing';

import {
  RelacionaComponent,
  RelacionaWordComponent
} from './relaciona';

import {
  MixedComponent,
  MixedWordComponent
} from './mixed';

import {
  WordsService,
  SoundFXService,
  ImageLoader } from './services';

import { ViewGameGuard } from './guards/viewgame.guard';
import { AuthGuard, AuthService } from '../auth';


const routes: Routes = [
  {
    path: 'game/:game',
    component: GameComponent
  },
  {
    path: 'play/:uid/:id',
    component: GameComponent,
    canActivate: [ViewGameGuard]
  },
  {
    path: 'preview/:uid/:id',
    component: GameComponent,
    canActivate: [ViewGameGuard]
  },
  {
    path: 'activitat',
    component: ActivitatComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/activitat',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ActivitatComponent,
    GameComponent,
    MemoryCardComponent,
    MemoryBoardComponent,
    SequencingBoardComponent,
    SequencingWordComponent,
    SequencingLetterComponent,
    RelacionaComponent,
    RelacionaWordComponent,
    MixedComponent,
    MixedWordComponent,
    StarComponent,
    BallonsComponent,
    TiDialogComponent,
    PointsComponent,
    TimerComponent,
    ButtonComponent,
  ],
  exports: [
    GameComponent
  ],
  providers: [
    WordsService,
    SoundFXService,
    ImageLoader,
    ViewGameGuard,
    AuthService
  ]
})
export class GameModule {}
