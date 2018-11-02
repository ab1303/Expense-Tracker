import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Page } from '../../../shared/model/paging/page';
import { IPaySlip } from './pay-slip.model';
import { PaySlipService } from './pay-slip.service';

@Component({
  selector: 'app-pay-slip',
  templateUrl: './pay-slip.component.html',
  styleUrls: ['./pay-slip.component.scss']
})
export class PaySlipComponent implements OnInit {

  // Salary Slips
  page = new Page();
  paySlips: IPaySlip[] = [];

  constructor(private paySlipService: PaySlipService) {
    this.page.pageNumber = 0;
    this.page.size = 20;
  }

  ngOnInit() {
    this.setPage({ offset: 0 });
  }


	/**
  * Populate the table with new data based on the page number
  * @param page The page to select
  */
  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.paySlipService.getPaySlips(this.page).subscribe(pagedData => {
      this.page.totalElements = pagedData.page.totalElements;
      this.paySlips = pagedData.paySlips;
    });
  }

  deletePaySlip(id) {
    console.log(`delete payslip id: ${id}`);
    this.paySlipService.deletePaySlip(id)
    .subscribe(
      () => this.paySlips = this.paySlips.filter(ps => ps.id !== id),
      (error: any) => console.log(error)
    );
  }

}
