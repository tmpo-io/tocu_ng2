import {Directive, ElementRef, Renderer} from '@angular/core';


// Simple example directive that fixes autofocus problem with multiple views
@Directive({
  selector: '[autofocus]' // using [ ] means selecting attributes
})
export class Autofocus {
  constructor(el: ElementRef, renderer: Renderer) {
    // autofocus fix for multiple views
    //console.log(el);
    renderer.invokeElementMethod(el.nativeElement, 'focus', []);
  }
}
