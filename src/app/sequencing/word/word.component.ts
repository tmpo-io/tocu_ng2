import {
  Component, Input, OnInit, OnChanges, SimpleChanges
} from '@angular/core';

@Component({
  selector: "sequencing-word",
  templateUrl:"./word.component.html",
  styleUrls: ["./word.component.scss"],
})
export class SequencingWordComponent implements OnInit, OnChanges {
  @Input() private word:string[];
  @Input() private current:number = 0;

  private internalWord:string = "";

  private buildWord() {
    this.internalWord = "";
    for(let i=0; i<this.current; i++) {
      this.internalWord += this.word[i];
    }
    for(let i=this.current; i<this.word.length; i++) {
      this.internalWord += " _";
    }
  }

  public ngOnInit() {
    //this.buildWord();
  }

  public ngOnChanges(c:SimpleChanges) {
    this.buildWord();
  }
}
