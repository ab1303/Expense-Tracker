import { Component, OnInit } from "@angular/core";
import { ITransaction } from "./transaction";
import { ExpenseRegisterService } from "./expense-register.service";
import { TrackByService } from "../../../core/trackby.service";

@Component({
  selector: "expense-register",
  templateUrl: "./expense-register.component.html",
  styleUrls: ["./expense-register.component.scss"]
})
export class ExpenseRegisterComponent implements OnInit {
  transactions: ITransaction[] = [];
  constructor(
    private expenseRegisterService: ExpenseRegisterService,
    public trackby: TrackByService
  ) {}

  ngOnInit() {
    this.expenseRegisterService.getTransactions().subscribe(data => {
      this.transactions = data.transactions;
    });
  }
}
