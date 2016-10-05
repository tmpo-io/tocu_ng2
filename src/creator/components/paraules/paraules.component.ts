import { Component, OnInit } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'creator-paraules',
  templateUrl: 'paraules.component.html',
  styleUrls: ['./paraules.component.scss']

})
export class ParaulesComponent implements OnInit {

  closeResult: string;
  public word:string = "lleó";

  constructor(private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content, {size:"lg"}).result.then((result)=> {
      this.closeResult = `Close with: ${result}`
    }, (reason)=>{
      this.closeResult = `Dismissed`
    })
  }

  select(item) {
    console.log("Item selected", item);
  }

  ngOnInit() { }
}
