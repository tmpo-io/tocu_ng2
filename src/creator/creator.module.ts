import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import {
  NgbTypeaheadModule,
  NgbAlertModule,
  NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import {
  CreatorComponent,
  HeaderComponent,
  JocsListComponent,
  JocEditComponent,
  ActivitatEditorComponent,
  ParaulesComponent,
  ClipartComponent,
  AddParaulaComponent,
  ImageFieldComponent,
  TiPreloadComponent,
  TiAudioPlayerComponent
} from './components';

import {
  Autofocus
} from './directives';

import {
  OpenClipartService,
  AudioGenService,
  JocDb
} from './services';

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
        path: 'jocs',
        component: JocsListComponent
      },
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
        redirectTo: 'jocs',
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
    NgbPaginationModule
  ],
  declarations: [
    CreatorComponent,
    HeaderComponent,
    JocsListComponent,
    JocEditComponent,
    ParaulesComponent,
    ClipartComponent,
    AddParaulaComponent,
    ImageFieldComponent,
    TiPreloadComponent,
    TiAudioPlayerComponent,
    ActivitatEditorComponent,
    Autofocus
  ],
  // exports: [
  //   CreatorComponent
  // ],
  providers: [
    AuthService,
    OpenClipartService,
    AudioGenService,
    JocDb
  ]
})
export class CreatorModule {}
