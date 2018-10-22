import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { merge } from 'rxjs/operators';

import { IPaySlip } from '../pay-slip/pay-slip.model';

@Component({
  selector: 'app-add-pay-slip',
  templateUrl: './add-pay-slip.component.html',
  styleUrls: ['./add-pay-slip.component.scss']
})
export class AddPaySlipComponent implements OnInit {

  addPaySlipForm: FormGroup;
  addPaySlipModel: IPaySlip;


  constructor() { }

  ngOnInit() {
    this.addPaySlipForm = new FormGroup({
      frequency: new FormControl('', Validators.required),
      periodStart: new FormControl('', Validators.required),
      periodEnd: new FormControl('', Validators.required),
      totalEarnings: new FormControl('', Validators.required),
      netPay: new FormControl('', Validators.required),
      tax: new FormControl({ value: '', disabled: true, }),
      taxPct: new FormControl({ value: '', disabled: true, }),
      superAnnuation: new FormControl('', Validators.required),
      superAnnuationPct: new FormControl({ value: '', disabled: true, }),
    });

    const netPayObs = this.addPaySlipForm.get('netPay').valueChanges;
    const totalEarningsObs = this.addPaySlipForm.get('totalEarnings').valueChanges;
    const superAnnuationObs = this.addPaySlipForm.get('superAnnuation').valueChanges;


    totalEarningsObs.pipe(merge(netPayObs)).subscribe(() => this.calculateTaxPct());
    totalEarningsObs.pipe(merge(superAnnuationObs)).subscribe(() => this.calculateSuperPct());

  }

  calculateTaxPct() {
    const netPay: any = this.addPaySlipForm.get('netPay').value;
    const totalEarnings: any = this.addPaySlipForm.get('totalEarnings').value;

    if (netPay && totalEarnings) {
      const tax = totalEarnings - netPay;
      const taxPct = (tax / totalEarnings);

      this.addPaySlipForm.get('tax').setValue(tax);
      this.addPaySlipForm.get('taxPct').setValue(taxPct);
    }
  }

  calculateSuperPct() {
    const totalEarnings: any = this.addPaySlipForm.get('totalEarnings').value;
    const superAnnuation: any = this.addPaySlipForm.get('superAnnuation').value;

    if (superAnnuation && totalEarnings) {
      const superPct = (superAnnuation / totalEarnings);
      this.addPaySlipForm.get('superAnnuationPct').setValue(superPct);
    }

  }

  save() {

  }

}
