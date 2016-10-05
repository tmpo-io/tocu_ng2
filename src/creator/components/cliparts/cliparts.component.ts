
import {
  Component, OnInit,
  Input, Output, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

import { OpenClipartService, Clipart } from '../../services';


@Component({
  selector: 'clipart-popup',
  templateUrl: 'cliparts.component.html',
  styleUrls: ['./cliparts.component.scss']
})
export class ClipartComponent implements OnInit {

  @Input() close:any
  @Input() searchWord:string;
  @Output() onSelect = new EventEmitter<string>();

  public results:Observable<Clipart[]>;

  constructor(private os:OpenClipartService) { }

  ngOnInit() {
    // this.os.getCliparts(this.searchWord)
    //   .subscribe(res => this.results = res);
    this.results = this.os.getCliparts(this.searchWord);
  }

  select(element) {
    this.onSelect.emit(element)
    this.close();

  }

  onClose() {
    this.close();
  }

  cercar() {
    this.results = this.os.getCliparts(this.searchWord);
  }

}
