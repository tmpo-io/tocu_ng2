import { Component, OnInit, Input } from '@angular/core';

declare var Howl:any;

@Component({
  selector: 'ti-audioplayer',
  templateUrl: './tiaudioplayer.component.html',
  styleUrls: ['./tiaudioplayer.component.scss']
})
export class TiAudioPlayerComponent implements OnInit {

  @Input() src:string = '';
  public snd:any;

  constructor() { }

  ngOnInit() { }

  click() {

    if(this.src == "") {
      return;
    }

    this.snd = new Howl({
      src: [this.src],
      autoplay: true
    });

    //this.snd.play()

  }
}
