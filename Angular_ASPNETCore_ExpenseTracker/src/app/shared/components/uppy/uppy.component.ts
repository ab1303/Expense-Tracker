import { Component, Input, OnInit, AfterViewInit, ViewEncapsulation, ChangeDetectionStrategy, ElementRef, Renderer2, Inject, HostBinding, Host } from "@angular/core";
import * as Uppy from '@uppy/core';
import * as XHRUpload from '@uppy/xhr-upload';
import { Subject } from "rxjs";

import { UppyLocaleStrings } from "./UppyLocaleStrings";
import { UppyContainerDirective } from "./uppy.container.directive";


export type UppyPluginConfigurations = [
  String,
  any
][];


@Component({
  selector: 'uppy',
  template: `<uppy-dashboard [height]="uppyContainer" [width]="containerWidth" [note]="note" [localeStrings]="localeStrings">
  </uppy-dashboard>`,
  styleUrls: ['./uppy.component.scss',],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UppyComponent implements OnInit, AfterViewInit {
  @Input() parentId: number;
  @Input() fileUploadUrl: string;
  @Input() plugins: UppyPluginConfigurations = [];
  @Input() on: Subject<[string, any, any, any]>;

  note: string = "Maximum file upload size is 5 MB";
  _uppy: Uppy.Uppy;
  localeStrings: UppyLocaleStrings = {
    dropPaste: 'Drag & drop or %{browse} file(s) to upload',
  };



  height: number;
  width: number;


  get Uppy(): Uppy.Uppy { return this._uppy; }

  constructor(@Host() private uppyContainer: UppyContainerDirective) {
    console.log(this.uppyContainer);
  }

  ngOnInit() {

    const uppyOptions = {
      id: 'file',
      restrictions: {
        maxFileSize: 1024 * 1024 * 5,
        maxNumberOfFiles: 3,
        minNumberOfFiles: 1,
        allowedFileTypes: ['.xls', '.xlsx']
      }
    };

    this._uppy = new Uppy.Uppy(uppyOptions);
    this._uppy.setMeta({ id: this.parentId });

    this._uppy.use(XHRUpload, {
      endpoint: this.fileUploadUrl,
      formData: true,
      // headers: authHeader,
      fieldName: 'fileAttachment',
    })

    const events = ['file-added', 'file-removed', 'upload', 'upload-progress', 'upload-success', 'complete', 'upload-error', 'info-visible', 'info-hidden']

    this._uppy.on('upload-progress', this.uploadProgress);
    this._uppy.on('upload-success', this.uploadSuccess);
    this._uppy.on('upload-error', this.uploadError);

    // Publish Event to subscribers
    events.forEach(ev => this._uppy.on(ev, (data1, data2, data3) => {
      if (this.on)
        this.on.next([ev, data1, data2, data3])

    }));

  }

  ngAfterViewInit(){
    console.log(this.uppyContainer);
  }

  uploadProgress(file, progress) {

  }

  uploadSuccess(file, response) {
    console.log(response);
  }

  uploadError(file, errResponse) {
    console.log(errResponse);
  }



}
