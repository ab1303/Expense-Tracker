import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { SharedModule } from '../../shared/shared.module';

import { INCOME_ROUTES } from './income.routes';
import { IncomeComponent } from './income.component';
import { PaySlipsComponent } from './pay-slips/pay-slips.component';
import { AddPaySlipComponent } from './add-pay-slip/add-pay-slip.component';
import { PaySlipService } from './pay-slips/pay-slip.service';


@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    SharedModule.forRoot(), RouterModule.forChild(INCOME_ROUTES)
  ],
  declarations: [IncomeComponent, PaySlipsComponent, AddPaySlipComponent],
  providers: [PaySlipService]
})
export class IncomeModule { }
