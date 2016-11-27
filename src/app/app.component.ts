import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  // public show: boolean = false;
  // public visible: boolean = true;

  // click($event) {
  //   console.log("Click", $event)
  //   this.visible = false;
  // }




  ngOnInit() {

    // setTimeout(()=>{
    //   this.show = true;
    // },1000)

  }



}
