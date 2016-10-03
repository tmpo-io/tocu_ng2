import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';


import {
  CreatorComponent,
  HeaderComponent,
  ActivitatsComponent,
  ParaulesComponent
} from './components';

const routes: Routes = [
  {
    path: 'creator',
    component: CreatorComponent,
    children: [
      {
        path: 'activitats',
        component: ActivitatsComponent
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
    ParaulesComponent
  ],
  // exports: [
  //   CreatorComponent
  // ],
  providers: [

  ]
})
export class CreatorModule {}
