import { Component } from '@angular/core';


import { WordsService } from '../services/words.service';
import { Observable } from 'rxjs';
import { Joc } from '../../models/joc';
import { AuthService } from '../../auth/services/auth-service';



@Component({
  selector: 'app-activitat',
  templateUrl: './activitat.component.html',
  styleUrls: ['./activitat.component.scss'],
})
export class ActivitatComponent {

  public data$: Observable<Joc[]>;

  constructor(
    public auth: AuthService,
    private ws: WordsService) {
    this.data$ = ws.loadGames(auth.id);
  }



}
