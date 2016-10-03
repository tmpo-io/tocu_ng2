import { Component, Input, ViewEncapsulation } from '@angular/core';

type typeButton = 'icon' | 'text' | 'text-icon';

@Component({
  selector: 'ti-button',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() private type:typeButton;
}
