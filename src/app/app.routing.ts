import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './shared/game';
import { ActivitatComponent } from './activitat';


const appRoutes: Routes = [
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
},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
