import { Component, Input,
    Output, EventEmitter } from '@angular/core';
// import { authReducer } from '../reducers/login';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  @Input() auth;
  @Output() loginAction: EventEmitter<any> = new EventEmitter();

  constructor() { }


}
