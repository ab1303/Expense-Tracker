import { Component, OnInit } from "@angular/core";
import {
  FileSelectDirective,
  FileDropDirective,
  FileUploader
} from "ng2-file-upload/ng2-file-upload";

import { TrackByService } from "../../../core/trackby.service";

import { API_BASE_ADDRESS } from "../../../app.constants";

const URL = "path_to_api";
const API_URL = `${API_BASE_ADDRESS}/Expenses/UploadFile`;

@Component({
  selector: "expense-sheet",
  templateUrl: "./expense-sheet.component.html",
  styleUrls: ["./expense-sheet.component.scss"],
 
})
export class ExpenseSheetComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: API_URL });
  public hasBaseDropZoneOver: boolean = false;
  constructor(public trackby: TrackByService) {}

  ngOnInit() {}

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
}
