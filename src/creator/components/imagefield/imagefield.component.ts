import {
  Component,
  EventEmitter,
  Input, OnInit, Output, } from '@angular/core';
import { Headers, Http, Response,
  ResponseContentType, RequestOptionsArgs } from '@angular/http';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ImageResult, ResizeOptions} from './interfaces';
import { createImage,
  resizeImage, dataURItoBlob } from './utils';

@Component({
  selector: 'image-field',
  templateUrl: './imagefield.component.html'
})
export class ImageFieldComponent implements OnInit {

  @Output() rawImage = new EventEmitter<ImageResult>();
  @Input() resizeOptions: ResizeOptions = {
    resizeMaxWidth: 600
  };
  @Input() word:string;
  @Input() src:string;

  // public src:string;

  constructor(
    private modal:NgbModal,
    private http:Http
    ) { }

  ngOnInit() { }

  public openLibrary(content) {
    this.modal.open(content);
  }

  public selectFromLibrary(item) {
    let img = item.url;
    const params: RequestOptionsArgs = {responseType: ResponseContentType.Blob}

    this.http.get(img, params).subscribe(
      (r:Response) => {
          let file = r.blob();
          let result: ImageResult = {
             file: file,
             url: URL.createObjectURL(r.blob())
          }
          this.fileToDataURL(file, result)
            .then(r => this.resize(r))
            .then((r) => {
              this.rawImage.emit(r)
              this.src = r.dataURL;
            });
      })
  }


  public clean() {
    this.src = null;
  }

  public selectFile(event) {
    for (let file of event.target.files) {
      let result: ImageResult = {
        file: file,
        url: URL.createObjectURL(file)
      }
      this.fileToDataURL(file, result)
        .then(r => this.resize(r))
        .then((r) => {
          this.rawImage.emit(r)
          this.src = r.dataURL;
        });
    }
  }

  private resize(result: ImageResult): Promise<ImageResult> {
    return new Promise((resolve) => {
      if (this.resizeOptions) {
        createImage(result.url, image => {
          let dataUrl = resizeImage(image, this.resizeOptions);
          result.resized = {
            dataURL: dataUrl,
            blob: dataURItoBlob(dataUrl, dataUrl.match(/:(.+\/.+;)/)[1]),
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
      file: File | Blob, result: ImageResult): Promise<ImageResult> {
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
