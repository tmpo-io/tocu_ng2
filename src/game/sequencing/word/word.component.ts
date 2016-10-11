import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: "sequencing-word",
  templateUrl:"./word.component.html",
  styleUrls: ["./word.component.scss"],
})
export class SequencingWordComponent implements OnChanges {
  @Input() word:string[];
  @Input() current:number = 0;

  private internalWord:string = "";

  public ngOnChanges(c:SimpleChanges) {
    this.internalWord = "";
    for(let i=0; i<this.current; i++) {
      this.internalWord += this.word[i];
    }
    for(let i=this.current; i<this.word.length; i++) {
      this.internalWord += " _";
    }
  }
}
