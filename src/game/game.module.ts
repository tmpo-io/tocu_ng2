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


const routes: Routes = [
  {
    path: 'game/:game',
    component: GameComponent
  },
  {
    path: 'activitat',
    component: ActivitatComponent
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
    ImageLoader
  ]
})
export class GameModule {}
