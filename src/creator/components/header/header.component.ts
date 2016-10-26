import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { AuthService } from '../../../auth';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'creator-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  public name: string;

  constructor(
    private auth: AuthService,
    public af: AngularFire,
    private router: Router
    ) { }

  ngOnInit() {
  }

  signOut(): void {
    this.auth.signOut();
    //@TODO Check why is not refreshing page...
    this.router.navigate(['/']);
  }

}
