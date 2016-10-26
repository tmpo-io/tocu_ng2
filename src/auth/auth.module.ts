import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';

import { SignInComponent } from './components/sign-in.component';
import { LoginComponent } from './components/login.component';
import { AuthGuard } from './guards/auth-guard';
import { UnauthGuard } from './guards/unauth-guard';
import { AuthService } from './services/auth-service';

import { AuthEffects } from './effects';


const routes: Routes = [
  {path: '', component: SignInComponent, canActivate: [UnauthGuard]}
];


@NgModule({
  declarations: [
    SignInComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.run(AuthEffects),
  ],
  providers: [
    AuthGuard,
    UnauthGuard,
    AuthService
  ]
})
export class AuthModule { }


export { AuthGuard };
export { AuthService };
export { UnauthGuard };
