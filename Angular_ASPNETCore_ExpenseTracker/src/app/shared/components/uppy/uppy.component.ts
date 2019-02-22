import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy} from "@angular/core";
import * as Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { Subject } from "rxjs";

import uppyEvents from './uppy-events.types';
import { UppyLocaleStrings } from "./UppyLocaleStrings";

export type UppyPluginConfigurations = [String, any][];

@Component({
  selector: "uppy",
  template: `
    <uppy-dashboard [note]="note" [localeStrings]="localeStrings">
    </uppy-dashboard>
  `,
  styleUrls: ["./uppy.component.scss"],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UppyComponent implements OnInit {
  @Input() parentId: number;
  @Input() fileUploadUrl: string;
  @Input() plugins: UppyPluginConfigurations = [];
  @Input() on: Subject<[string, any, any, any]>;

  note: string = "Maximum file upload size is 5 MB";
  _uppy: Uppy.Uppy;
  localeStrings: UppyLocaleStrings = {
    dropPaste: "Drag & drop or %{browse} file(s) to upload"
  };

  get Uppy(): Uppy.Uppy {
    return this._uppy;
  }

  ngOnInit() {
    const uppyOptions = {
      id: "file",
      restrictions: {
        maxFileSize: 1024 * 1024 * 5,
        maxNumberOfFiles: 3,
        minNumberOfFiles: 1,
        allowedFileTypes: [".xls", ".xlsx"]
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

    const events = [
      uppyEvents.FILE_ADDED, uppyEvents.FILE_REMOVED, 
      uppyEvents.UPLOAD, uppyEvents.UPLOAD_PROGRESS, uppyEvents.UPLOAD_SUCCESS, uppyEvents.COMPLETE, uppyEvents.UPLOAD_ERROR, 
      uppyEvents.INFO_INVISIBLE, uppyEvents.INFO_HIDDEN];

    this._uppy.on(uppyEvents.UPLOAD_PROGRESS, this.uploadProgress);
    this._uppy.on(uppyEvents.UPLOAD_SUCCESS, this.uploadSuccess);
    this._uppy.on(uppyEvents.UPLOAD_ERROR, this.uploadError);

    // Publish Event to subscribers
    events.forEach(ev =>
      this._uppy.on(ev, (data1, data2, data3) => {
        if (this.on) this.on.next([ev, data1, data2, data3]);
      })
    );
  }

  uploadProgress(file, progress) {
    console.log(file);
    console.log(progress);
  }

  uploadSuccess(response) {
    console.log(response);
  }

  uploadError(errResponse) {
    console.log(errResponse);
  }
}
