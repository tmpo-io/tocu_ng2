import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';


import {
  CreatorComponent,
  HeaderComponent,
  ActivitatsComponent,
  AddActivitatComponent,
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
        path: 'activitats',
        component: ActivitatsComponent
      },
      {
        path: 'activitats/:id',
        component: ActivitatEditorComponent
      },
      {
        path: 'paraules',
        component: ParaulesComponent
      },
      {
        path: '',
        redirectTo: 'activitats',
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
    RouterModule.forChild(routes)
  ],
  declarations: [
    CreatorComponent,
    HeaderComponent,
    ActivitatsComponent,
    AddActivitatComponent,
    ParaulesComponent,
    ClipartComponent,
    AddParaulaComponent,
    ImageFieldComponent,
    TiPreloadComponent,
    TiAudioPlayerComponent,
    ActivitatEditorComponent
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
