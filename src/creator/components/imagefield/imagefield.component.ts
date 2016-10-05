import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output, } from '@angular/core';

import {ImageResult, ResizeOptions} from './interfaces';
import {createImage, resizeImage} from './utils';

@Component({
  moduleId: module.id,
  selector: 'image-field',
  templateUrl: './imagefield.component.html'
})
export class ImageFieldComponent implements OnInit {

  @Output() rawImage = new EventEmitter<any>();
  @Input() resizeOptions: ResizeOptions;

  constructor() { }

  ngOnInit() { }

  // @HostListener('change', ['$event'])
  //   private readFiles(event) {
  //       for (let file of event.target.files) {
  //           let result: ImageResult = {
  //               file: file,
  //               url: URL.createObjectURL(file)
  //           };
  //           this.fileToDataURL(file, result).then(r => this.resize(r)).then(r => this.imageSelected.emit(r));
  //       }
  //   }

  private resize(result: ImageResult): Promise<ImageResult> {
      return new Promise((resolve) => {
        if (this.resizeOptions) {
          createImage(result.url, image => {
            let dataUrl = resizeImage(image, this.resizeOptions);
            result.resized = {
              dataURL: dataUrl,
              type: dataUrl.match(/:(.+\/.+;)/)[1]
            };
            resolve(result);
          });
        } else {
          resolve(result);
        }
      });
    }

  private fileToDataURL(
      file: File, result: ImageResult): Promise<ImageResult> {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = function (e) {
        result.dataURL = reader.result;
        resolve(result);
      };
      reader.readAsDataURL(file);
    });
  }

}
