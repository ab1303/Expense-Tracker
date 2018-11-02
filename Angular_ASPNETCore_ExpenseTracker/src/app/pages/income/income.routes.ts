import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../../security/auth.guard";

import { PaySlipsComponent } from "./pay-slips/pay-slips.component";
import { AddPaySlipComponent } from "./add-pay-slip/add-pay-slip.component";

export const INCOME_ROUTES = [
  {
    path: "payslips",
    component: PaySlipsComponent
  },
  {
    path: "payslips/add",
    component: AddPaySlipComponent
  },
];
