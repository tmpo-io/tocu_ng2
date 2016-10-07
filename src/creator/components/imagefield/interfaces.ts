

export interface ImageResult {
  file: File | Blob;
  url: string;
  dataURL?: string;
  resized?: {
    dataURL: string
    type: string;
    blob: Blob;
  }
}

export interface ResizeOptions {
    resizeMaxHeight?: number;
    resizeMaxWidth?: number;
    resizeQuality?: number;
    resizeType?: string;
}
