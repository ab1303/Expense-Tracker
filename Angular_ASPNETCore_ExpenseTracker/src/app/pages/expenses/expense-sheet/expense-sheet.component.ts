import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef, TemplateRef } from "@angular/core";


import { TrackByService } from "../../../core/trackby.service";

import { API_BASE_ADDRESS } from "../../../app.constants";
import { Subject } from "rxjs";
import { BsModalService, BsModalRef } from "ngx-bootstrap";

const URL = "path_to_api";
const API_URL = `${API_BASE_ADDRESS}/Expenses/UploadFile`;

@Component({
  selector: "expense-sheet",
  templateUrl: "./expense-sheet.component.html",
  styleUrls: ["./expense-sheet.component.scss"],

})
export class ExpenseSheetComponent implements OnDestroy, AfterViewInit {
  uppyEvent = new Subject<[string, any, any, any]>();
  onDestroy$ = new Subject<void>();

  fileUploadUrl: string = `${API_BASE_ADDRESS}/Expenses/UploadFile`;
  bsModalRef:BsModalRef;
  modalRef:BsModalRef;
  @ViewChild('uppyModalTemplate') uppyModalTemplate: TemplateRef<any>
  constructor(public trackby: TrackByService, private modalService: BsModalService ) {
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


  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
