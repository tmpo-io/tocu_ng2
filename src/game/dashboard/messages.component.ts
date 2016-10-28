import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../../models/message';

@Component({
  selector: 'app-dash-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class DashMessagesComponent {

  @Input() messages;
  @Output() deleteMessage: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }


}
