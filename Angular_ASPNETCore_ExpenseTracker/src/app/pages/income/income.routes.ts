import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../../security/auth.guard";

import { PaySlipComponent } from "./pay-slip/pay-slip.component";
import { AddPaySlipComponent } from "./add-pay-slip/add-pay-slip.component";

export const INCOME_ROUTES = [
  {
    path: "payslips",
    component: PaySlipComponent
  },
  {
    path: "payslips/add",
    component: AddPaySlipComponent
  },
];
