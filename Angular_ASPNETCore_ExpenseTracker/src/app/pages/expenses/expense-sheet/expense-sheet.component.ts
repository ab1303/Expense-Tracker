import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, TemplateRef } from "@angular/core";


import { TrackByService } from "../../../core/trackby.service";

import { API_BASE_ADDRESS } from "../../../app.constants";
import { Subject } from "rxjs";
import uppyEventsTypes from "../../../shared/components/uppy/uppy-events.types";


@Component({
  selector: "expense-sheet",
  templateUrl: "./expense-sheet.component.html",
  styleUrls: ["./expense-sheet.component.scss"],

})
export class ExpenseSheetComponent implements OnDestroy, AfterViewInit {
  uppyEvent = new Subject<[string, any, any, any]>();
  onDestroy$ = new Subject<void>();

  fileUploadUrl: string = `${API_BASE_ADDRESS}/Expenses/UploadFile`;
  constructor(public trackby: TrackByService ) {
    this.uppyEvent
      .takeUntil(this.onDestroy$)
      .filter(([ev]) => ev[uppyEventsTypes.COMPLETE])
      .subscribe(
        ([ev, data1, data2, data3]) =>
          console.log("Received '" + ev + "' event from instance 1", 'Upload complete'),
        (err) => console.dir(err),
        () => console.log('done')
      )
  }

  ngAfterViewInit(): void {


  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
