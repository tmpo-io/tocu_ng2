import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';


import { CreatorComponent } from './creator/';

const routes: Routes = [
  {
    path: 'creator',
    component: CreatorComponent
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
    CreatorComponent
  ],
  exports: [
    CreatorComponent
  ],
  providers: [

  ]
})
export class CreatorModule {}
