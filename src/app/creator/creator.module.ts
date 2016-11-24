import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';


import {
  NgbTypeaheadModule,
  NgbAlertModule,
  NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import {
  CreatorComponent,
  HeaderComponent,
  JocEditComponent,
  ParaulesComponent,
  ClipartComponent,
  AddParaulaComponent,
  ImageFieldComponent,
  TiAudioPlayerComponent
} from './components';

import { WordSelectorComponent } from './components/wordselector/wordselector.component';

import { Autofocus } from './directives';
import { SharedModule } from '../shared/shared.module';

import {
  OpenClipartService,
  AudioGenService,
  JocDb
} from './services';

import { CreatorEffects } from './creator.effects';

import { AuthGuard, AuthService } from '../auth';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/zip';
import 'rxjs/add/operator/scan';
import 'rxjs/observable/IntervalObservable';



const routes: Routes = [
  {
    path: 'creator',
    component: CreatorComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'jocs/:id',
        component: JocEditComponent
      },
      {
        path: 'paraules',
        component: ParaulesComponent
      },
      {
        path: '',
        redirectTo: '/activitat',
        pathMatch: 'full'
      }
    ]
  }
];


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbTypeaheadModule,
    NgbAlertModule,
    NgbPaginationModule,
    SharedModule,
    EffectsModule.run(CreatorEffects)
  ],
  declarations: [
    CreatorComponent,
    HeaderComponent,
    JocEditComponent,
    ParaulesComponent,
    ClipartComponent,
    AddParaulaComponent,
    ImageFieldComponent,
    TiAudioPlayerComponent,
    Autofocus,
    WordSelectorComponent
  ],
  exports: [
  ],
  providers: [
    AuthService,
    OpenClipartService,
    AudioGenService,
    JocDb
  ]
})
export class CreatorModule {}
