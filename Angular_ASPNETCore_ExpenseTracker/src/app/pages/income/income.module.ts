import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";

import { SharedModule } from '../../shared/shared.module';

import { INCOME_ROUTES } from './income.routes';
import { IncomeComponent } from './income.component';
import { PaySlipComponent } from './pay-slip/pay-slip.component';
import { AddPaySlipComponent } from './add-pay-slip/add-pay-slip.component';
import { PaySlipService } from './pay-slip/pay-slip.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot(), RouterModule.forChild(INCOME_ROUTES)
  ],
  declarations: [IncomeComponent, PaySlipComponent, AddPaySlipComponent],
  providers: [PaySlipService]
})
export class IncomeModule { }
