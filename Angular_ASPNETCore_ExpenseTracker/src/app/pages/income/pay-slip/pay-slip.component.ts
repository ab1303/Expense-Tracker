import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { merge } from 'rxjs/operators';

import { IPaySlip } from '../pay-slips/pay-slip.model';
import { PaySlipService } from '../pay-slips/pay-slip.service';

const ADD_MODE = 'add';
const EDIT_MODE = 'edit';

@Component({
  selector: 'app-pay-slip',
  templateUrl: './pay-slip.component.html',
  styleUrls: ['./pay-slip.component.scss']
})
export class PaySlipComponent implements OnInit {

  paySlipForm: FormGroup;
  paySlipModel: IPaySlip;

  mode: string;
  errorMessage: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private paySlipService: PaySlipService) {
    this.route.paramMap.subscribe(params => {
      this.mode = params.get('mode')
      if (this.mode === EDIT_MODE) {
        const paySlipId = +params.get('id');
        this.paySlipModel = paySlipService.paySlips.find(ps => ps.id === paySlipId);
      }
    })
  }

  ngOnInit() {

    // this.paySlipForm = new FormGroup({
    //   frequency: new FormControl('', Validators.required),
    //   periodStart: new FormControl('', Validators.required),
    //   periodEnd: new FormControl('', Validators.required),
    //   totalEarnings: new FormControl('', Validators.required),
    //   netPay: new FormControl('', Validators.required),
    //   tax: new FormControl({ value: '', disabled: true, }),
    //   taxPct: new FormControl({ value: '', disabled: true, }),
    //   superAnnuation: new FormControl('', Validators.required),
    //   superAnnuationPct: new FormControl({ value: '', disabled: true, }),
    // });

    this.paySlipForm = new FormGroup({
      frequency: new FormControl(`${this.paySlipModel.frequency}`, Validators.required),
      periodStart: new FormControl(this.paySlipModel.periodStart, Validators.required),
      periodEnd: new FormControl(this.paySlipModel.periodEnd, Validators.required),
      totalEarnings: new FormControl(this.paySlipModel.totalEarnings, Validators.required),
      netPay: new FormControl(this.paySlipModel.netPay, Validators.required),
      tax: new FormControl({ value: '', disabled: true, }),
      taxPct: new FormControl({ value: '', disabled: true, }),
      superAnnuation: new FormControl(this.paySlipModel.superAnnuation, Validators.required),
      superAnnuationPct: new FormControl({ value: '', disabled: true, }),
    });


    if (this.mode === EDIT_MODE) {
      this.calculateTaxPct();
      this.calculateSuperPct();
    }

    const netPay$ = this.paySlipForm.get('netPay').valueChanges;
    const totalEarnings$ = this.paySlipForm.get('totalEarnings').valueChanges;
    const superAnnuation$ = this.paySlipForm.get('superAnnuation').valueChanges;

    totalEarnings$.pipe(merge(netPay$)).subscribe(() => this.calculateTaxPct());
    totalEarnings$.pipe(merge(superAnnuation$)).subscribe(() => this.calculateSuperPct());

  }

  calculateTaxPct() {
    const netPay: any = this.paySlipForm.get('netPay').value;
    const totalEarnings: any = this.paySlipForm.get('totalEarnings').value;

    if (netPay && totalEarnings) {
      const tax = totalEarnings - netPay;
      const taxPct = (tax / totalEarnings);

      this.paySlipForm.get('tax').setValue(tax);
      this.paySlipForm.get('taxPct').setValue(taxPct);
    }
  }

  calculateSuperPct() {
    const totalEarnings: any = this.paySlipForm.get('totalEarnings').value;
    const superAnnuation: any = this.paySlipForm.get('superAnnuation').value;

    if (superAnnuation && totalEarnings) {
      const superPct = (superAnnuation / totalEarnings);
      this.paySlipForm.get('superAnnuationPct').setValue(superPct);
    }

  }

  save() {
    if (this.paySlipForm.dirty && this.paySlipForm.valid) {
      let paySlip: IPaySlip = (<any>Object).assign({}, this.paySlipModel, this.paySlipForm.value) as IPaySlip;

      if (this.mode === ADD_MODE) {
        this.paySlipService.addPaySlip(paySlip.frequency, paySlip.periodStart, paySlip.periodEnd, paySlip.totalEarnings, paySlip.netPay, paySlip.superAnnuation)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      } else {
        this.paySlipService.updatePaySlip(paySlip)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  getSubmitLabelText(): string {
    return (this.mode === ADD_MODE) ? 'Submit' : 'Update'
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.paySlipForm.reset();
    this.router.navigate(['/income/payslips']);
  }

}
