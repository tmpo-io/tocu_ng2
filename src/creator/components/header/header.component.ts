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
  constructor(
    private auth:AuthService,
    public af:AngularFire,
    private router:Router
    ) { }

  public name:string

  ngOnInit() {
    //console.log("Auth", this.auth, this.af);
    // this.name = this.auth.authState.auth.displayName;
  }

  signOut():void {
    this.auth.signOut();
    //@TODO Check why is not refreshing page...
    this.router.navigate(["/"])
  }

}
