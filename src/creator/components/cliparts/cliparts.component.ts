
import {
  Component, OnInit,
  Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'clipart-popup',
  templateUrl: 'cliparts.component.html',
  styleUrls: ['./cliparts.component.scss']
})
export class ClipartComponent implements OnInit {

  @Input() close:any
  @Input() searchWord:string;
  @Output() onSelect = new EventEmitter<string>();


  constructor() { }

  ngOnInit() { }

  select() {
    this.onSelect.emit("test selected")
    this.close();
  }

  onClose() {
    this.close();
  }

}
