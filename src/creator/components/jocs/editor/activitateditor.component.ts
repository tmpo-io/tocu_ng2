import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

import { AuthService } from '../../../../auth';

@Component({
  selector: 'activitateditor',
  templateUrl: 'activitateditor.component.html'
})
export class ActivitatEditorComponent implements OnInit {

  public activitat:FirebaseObjectObservable<any>
  public act:any;
  private activitatId:string
  private afPath:string

  constructor(
    private af:AngularFire,
    private route: ActivatedRoute,
    private auth:AuthService) {}

  ngOnInit() {
    this.route.params.subscribe(params=>{
      let aid = params["id"];
      this.activitatId = aid
      this.afPath = `users/${this.auth.id}/activitats/${aid}`
      this.activitat = this.af.database.object(this.afPath);
      this.activitat.subscribe(obj=>{
        this.act = obj;
      })
    })
  }

}
