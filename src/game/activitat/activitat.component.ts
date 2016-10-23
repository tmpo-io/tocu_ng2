import { Component } from '@angular/core';


import { WordsService } from '../services/words.service';
import { Observable } from 'rxjs';
import { Joc } from '../../models/joc';



@Component({
  selector: 'app-activitat',
  templateUrl: './activitat.component.html',
  styleUrls: ['./activitat.component.scss'],
})
export class ActivitatComponent {

  public data$: Observable<Joc[]>;

  constructor(private ws: WordsService) {

  }



}
