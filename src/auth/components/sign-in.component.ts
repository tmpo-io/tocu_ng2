import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth-service';



@Component({
  selector: 'signin',
  templateUrl: 'sign-in.component.html',
  styleUrls: ['sign-in.component.scss']
})
export class SignInComponent {
  constructor(
    private auth: AuthService,
    private router:Router) { }

    signInWithCoogle():void {
      this.auth.signInWithGoogle()
        .then(() => this.postSignIn())
    }

    postSignIn() {
      this.router.navigate(['/activitat'])
    }

}
