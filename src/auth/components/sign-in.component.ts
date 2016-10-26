
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import 'rxjs/add/operator/share';
import { Observable } from 'rxjs/Observable';


import { AuthActions } from '../auth.actions';
import { Auth } from '../../models/auth';
import { AuthService } from '../services/auth-service';
import { Subscription } from 'rxjs/Subscription';




@Component({
  selector: 'app-signin',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['sign-in.component.scss']
})
export class SignInComponent implements OnDestroy {

  auth$: Observable<Auth>;
  subs: Subscription;

  constructor(
    private auth: AuthService,
    private router: Router,
    private store: Store<any>) {
      this.auth$ = this.store
        .select('auth')
        .skip(1) as Observable<Auth>;

      this.auth$.share().subscribe((f) => {
        console.log(f);
        if (f.isLogged) {
          this.postSignIn();
        }
      });
    }

    signInWithGoogle(): void {
      this.store.dispatch(AuthActions.actionLogin());
    }

    postSignIn() {
      this.router.navigate(['/activitat']);
    }

    ngOnDestroy() {
      if (this.subs) {
        this.subs.unsubscribe();
      }
    }

}
