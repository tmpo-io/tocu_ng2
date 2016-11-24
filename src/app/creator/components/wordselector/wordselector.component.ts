import {
  Component, Input,
  Output, EventEmitter
} from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Word } from '../../../models/word';

@Component({
  selector: 'app-word-selector',
  templateUrl: './wordselector.component.html',
  styleUrls: ['./wordselector.component.scss']
})
export class WordSelectorComponent {

  @Input()
  words: Word[];
  @Input()
  close: any;
  @Input()
  selected: Word[] = [];

  @Output()
  onSelect = new EventEmitter<Word[]>();

  constructor() { }

  get paraules(): Word[] {
    let sel = [];
    this.selected.forEach(w => sel.push(w.id));
    let curr = this.words.map((w) => {
      if (sel.indexOf(w.id) !== -1) {
        w.selected = true;
      } else {
        w.selected = false;
      }
      return w;
    });
    return curr;
  }

  click(item: Word) {

    if (item.selected) {
      item.selected = false;
      let index = this.selected
        .findIndex(x => x.id === item.id);
      this.selected = [
        ...this.selected.slice(0, index),
        ...this.selected.slice(index + 1)
      ];
    } else {
      item.selected = true;
      this.selected = [
        ...this.selected,
        item
      ];
    }
    // console.log(this.selected)
    let items = [];
    this.selected.forEach((el) => {
        let it = Object.assign({}, el);
        delete it.selected;
        items.push(it);
      });
    // console.log('items', items);
    this.onSelect.next(items);
  }



}
