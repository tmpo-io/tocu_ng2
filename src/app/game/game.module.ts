import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../shared/shared.module';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


import { ActivitatComponent } from './dashboard/activitat.component';
import { DashWelcomeComponent } from './dashboard/welcome.component';
import { DashMessagesComponent } from './dashboard/messages.component';
import { UserDashboardComponent } from './components/userdashboard.component';

import { GameComponent } from './shared/game/game.component';

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
  LletresComponent
} from './lletres/lletres.component';

import {
  LletresEditorComponent
} from './lletres/lletreseditor.component';

import {
  WordsService,
  SoundFXService,
  ImageLoader } from './services';



import { DashboardEffects } from './dashboard.effects';
import { GSEffects } from './gamesession.effects';

import { ViewGameGuard } from './guards/viewgame.guard';
import { AuthGuard, AuthService } from '../auth';

import { UserDashComponent,
  DashboardComponent,
  CharEditorComponent,
  TestComponent
} from './pages';

import { BoardExistsGuard } from './guards/boardexists.guard';


const routes: Routes = [
  {
    path: 'usuari/:user',
    component: UserDashComponent,
    canActivate: [BoardExistsGuard]
  },
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
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/activitat',
    pathMatch: 'full'
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'char/editor',
    component: CharEditorComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    SharedModule,
    NgbAlertModule,
    RouterModule.forChild(routes),
    EffectsModule.run(DashboardEffects),
    EffectsModule.run(GSEffects)
  ],
  declarations: [
    ActivitatComponent,
    DashWelcomeComponent,
    DashMessagesComponent,
    DashboardComponent,
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
    UserDashComponent,
    TestComponent,
    CharEditorComponent,
    UserDashboardComponent,
    LletresComponent,
    LletresEditorComponent,
  ],
  exports: [
    GameComponent
  ],
  providers: [
    WordsService,
    SoundFXService,
    ImageLoader,
    ViewGameGuard,
    AuthService,
    BoardExistsGuard
  ]
})
export class GameModule {}
