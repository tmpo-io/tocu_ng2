import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameComponent } from './shared/game';


const appRoutes: Routes = [
  {
    path: 'game/:game',
    component: GameComponent
  },
  {
  path: '',
  redirectTo: '/game/memory',
  pathMatch: 'full'
},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
