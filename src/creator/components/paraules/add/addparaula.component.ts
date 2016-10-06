import { Component, OnInit } from '@angular/core';
import { ImageResult } from '../../imagefield/interfaces';


@Component({
  selector: 'add-paraula',
  templateUrl: 'addparaula.component.html',
  styleUrls: ['./addparaula.component.scss']
})
export class AddParaulaComponent implements OnInit {

  public image:ImageResult
  public paraula:string = ""

  constructor() { }

  ngOnInit() { }

  public imageSelected(event:ImageResult) {
    //console.log("Image changed", event);
    this.image = event;
  }

}
