import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

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
  OpenClipartService,
  AudioGenService
} from './services';

import { AuthGuard, AuthService } from '../auth';

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
    RouterModule.forChild(routes),
    NgbTypeaheadModule
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
  ],
  // exports: [
  //   CreatorComponent
  // ],
  providers: [
    AuthService,
    OpenClipartService,
    AudioGenService
  ]
})
export class CreatorModule {}
