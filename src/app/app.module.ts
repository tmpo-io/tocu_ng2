
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { AuthModule } from './auth';
import { CreatorModule } from './creator';
import { FirebaseModule } from './firebase';
import { GameModule } from './game';


// Reducers
import { authReducer } from './auth/reducers/login';
import { dashboardReducer } from './game/dashboard.reducers';
import { gsReducer } from './game/gamesession.reducers';
import { lletresGameReducer } from './game/lletres/lletres.reducer';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], {useHash: false}),
    AuthModule,
    GameModule,
    CreatorModule,
    FirebaseModule,
    NgbModule.forRoot(),
    StoreModule.provideStore({
      auth: authReducer,
      dashboard: dashboardReducer,
      gameSession: gsReducer,
      lletresGame: lletresGameReducer
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
