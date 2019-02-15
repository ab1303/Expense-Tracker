import { Component, Input, OnInit, AfterViewInit, ViewEncapsulation, ChangeDetectionStrategy } from "@angular/core";
import * as Uppy from '@uppy/core';
import * as XHRUpload from '@uppy/xhr-upload';
import { Subject } from "rxjs";

import { UppyService } from "./uppy.service";
import { v4 } from 'uuid';


export type UppyPluginConfigurations = [
  String,
  any
][];

export interface UppyLocaleStrings {
  dropPaste: string,
};

@Component({
  selector: 'uppy',
  template: `<uppy-dashboard [uppy]="uppy" [height]="470" [note]="note" [localeStrings]="localeStrings">
  </uppy-dashboard>`,
  styleUrls: ['./uppy.component.scss',],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UppyComponent implements OnInit {
  @Input() parentId: number;
  @Input() fileUploadUrl: string;
  @Input() plugins: UppyPluginConfigurations = [];
  @Input() on: Subject<[string, any, any, any]>;

  note: string = "Maximum file upload size is 5 MB";
  uppy: Uppy.Uppy;
  localeStrings: UppyLocaleStrings = {
    dropPaste: 'Drag & drop or %{browse} file(s) to upload',
  };

  constructor(public uppyService: UppyService) {
  }

  ngOnInit() {

    const uppyOptions = {
      id: 'file',
      restrictions: {
        maxFileSize: 1024 * 1024 * 5,
        maxNumberOfFiles: 3,
        minNumberOfFiles: 1,
        allowedFileTypes: ['.xls','.xlsx']
      }
    };

    this.uppy = new Uppy.Uppy(uppyOptions);
    this.uppy.setMeta({ id: this.parentId });

    this.uppy.use(XHRUpload, {
      endpoint: this.fileUploadUrl,
      formData: true,
      // headers: authHeader,
      fieldName: 'fileAttachment',
    })

    const events = ['file-added', 'file-removed', 'upload', 'upload-progress', 'upload-success', 'complete', 'upload-error', 'info-visible', 'info-hidden']

    this.uppy.on('upload-progress', this.uploadProgress);
    this.uppy.on('upload-success', this.uploadSuccess);
    this.uppy.on('upload-error', this.uploadError);

    // Publish Event to subscribers
    events.forEach(ev => this.uppy.on(ev, (data1, data2, data3) => {
      if (this.on)
        this.on.next([ev, data1, data2, data3])

    }));

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
