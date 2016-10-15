
import {
  Component, OnInit,
  Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { OpenClipartService, Clipart } from '../../services';


export const onLoad = function(res) {
  // console.log("Found", res.length);
  this.numResults = res.length;
  this.results = Observable.from(res).toArray();
  this.loaded = true;
}

@Component({
  selector: 'clipart-popup',
  templateUrl: 'cliparts.component.html',
  styleUrls: ['./cliparts.component.scss']
})
export class ClipartComponent implements OnInit {

  @Input() close:any
  @Input() searchWord:string = "";
  @Output() onSelect = new EventEmitter<string>();

  public results:Observable<Clipart[]>;
  // public results:Clipart[];
  public loaded:boolean = true;
  public numResults:number;

  constructor(private os:OpenClipartService) { }

  ngOnInit() {
    if(this.searchWord != "") {
      this.os.getCliparts(this.searchWord)
        .subscribe(onLoad.bind(this));
    }
    // this.results = this.os.getCliparts(this.searchWord);
  }

  select(element) {
    this.onSelect.emit(element)
    this.close();

  }

  onClose() {
    this.close();
  }

  private clean() {
    this.results = Observable.from([]).toArray();
  }

  cercar() {
    this.clean();
    this.loaded = false;
    this.os.getCliparts(this.searchWord)
      .subscribe(onLoad.bind(this));
  }

}
