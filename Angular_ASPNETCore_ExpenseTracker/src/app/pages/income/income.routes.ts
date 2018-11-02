import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "../../security/auth.guard";

import { PaySlipsComponent } from "./pay-slips/pay-slips.component";
import { PaySlipComponent } from "./pay-slip/pay-slip.component";

export const INCOME_ROUTES = [
  {
    path: "payslips",
    component: PaySlipsComponent
  },
  {
    path: "payslips/add",
    component: PaySlipComponent
  },
];
