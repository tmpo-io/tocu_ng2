import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthActions } from '../auth.actions';

import { AuthService } from '../services/auth-service';


@Component({
  selector: 'signin',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['sign-in.component.scss']
})
export class SignInComponent {



  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store<any>
    ) {

    }

    signInWithCoogle(): void {
      // this.auth.signInWithGoogle()
      //   .then(() => this.postSignIn());
      this.store.dispatch(AuthActions.actionLogin());
      this.postSignIn();
  }

    postSignIn() {
      this.router.navigate(['/activitat']);
    }

}
