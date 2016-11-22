
import {
  Component, OnInit, OnDestroy,
  Input, Output, EventEmitter } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { OpenClipartService, Clipart } from '../../services';


export const onLoad = function(res) {
  this.numResults = res.length;
  this.results = Observable.from(res).toArray();
  this.loaded = true;
};

@Component({
  selector: 'app-clipart-popup',
  templateUrl: 'cliparts.component.html',
  styleUrls: ['./cliparts.component.scss']
})
export class ClipartComponent implements OnInit, OnDestroy {

  @Input() close: any;
  @Input() searchWord: string = '';
  @Output() onSelect = new EventEmitter<string>();

  public results: Observable<Clipart[]>;
  public loaded: boolean = true;
  public numResults: number;
  public sub: Subscription;

  constructor(private os: OpenClipartService) { }

  ngOnInit() {
    if (this.searchWord && this.searchWord !== '') {
      this.sub = this.os.getCliparts(this.searchWord)
        .subscribe(onLoad.bind(this));
    }
  }

  select(element) {
    this.onSelect.emit(element);
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

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
