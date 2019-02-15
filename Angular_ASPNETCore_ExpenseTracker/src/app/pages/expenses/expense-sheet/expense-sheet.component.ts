import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import * as Dashboard from '@uppy/dashboard';


import { TrackByService } from "../../../core/trackby.service";

import { API_BASE_ADDRESS } from "../../../app.constants";
import { UppyService } from "../../../shared/components/uppy/uppy.service";
import { Subject } from "rxjs";

const URL = "path_to_api";
const API_URL = `${API_BASE_ADDRESS}/Expenses/UploadFile`;

@Component({
  selector: "expense-sheet",
  templateUrl: "./expense-sheet.component.html",
  styleUrls: ["./expense-sheet.component.scss"],

})
export class ExpenseSheetComponent implements OnInit, OnDestroy, AfterViewInit {
  uppyEvent = new Subject<[string, any, any, any]>();
  onDestroy$ = new Subject<void>();

  constructor(public trackby: TrackByService, public uppyService: UppyService) {
    this.uppyEvent
      .takeUntil(this.onDestroy$)
      .filter(([ev]) => ev['complete'])
      .subscribe(
        ([ev, data1, data2, data3]) =>
          console.log("Received '" + ev + "' event from instance 1", 'Upload complete'),
        (err) => console.dir(err),
        () => console.log('done')
      )
  }

  ngAfterViewInit(): void {
    // const uppy = this.uppyService.uppy as any;

    // const fileUploaderUppy = new uppy({
    //   id: 'file',
    //   restrictions: {
    //     maxFileSize: 1024 * 1024 * 5,
    //     maxNumberOfFiles: 3,
    //   },
    // });

    // fileUploaderUppy
    //   .use(Dashboard, {
    //     target: '.instance3',
    //     replaceTargetContent: true,
    //     inline: true,
    //   })
    //   // .use(uppy.Tus, { endpoint: 'https://master.tus.io/files/' })
    //   // .use(uppy.Webcam, { target: uppy.Dashboard })
    //   .run()

    //   fileUploaderUppy.on("complete", (data) => console.log("Received 'complete' event from instance 3", 'Upload complete'));
    
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }



  ngOnInit() { }

}
