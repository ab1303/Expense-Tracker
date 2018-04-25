import { Component, OnInit } from "@angular/core";
import { TrackByService } from "../../../core/trackby.service";

@Component({
  selector: "expense-sheet",
  templateUrl: "./expense-sheet.component.html",
  styleUrls: ["./expense-sheet.component.scss"]
})
export class ExpenseSheetComponent implements OnInit {
  constructor(
    public trackby: TrackByService
  ) {}

  ngOnInit() {
   
  }
}
