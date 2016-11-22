import {
  Component, Output, Input,
  OnInit, EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-profilelogin',
  templateUrl: 'profilelogin.component.html',
  styleUrls: ['./profilelogin.component.scss']
})
export class ProfileLoginComponent implements OnInit {

  op1: number = 0;
  op2: number = 0;
  res: number;

  @Output()
  result = new EventEmitter<boolean>();
  @Input()
  close: any;

  ngOnInit() {
    this.op1 = Math.round(Math.random() * 50);
    this.op2 = 5 + Math.round(Math.random() * 5);
  }

  validate() {
    if (this.res === (this.op1 + this.op2)) {
      this.result.next(true);
      this.close();
    } else {
      this.res = undefined;
    }
  }

}
