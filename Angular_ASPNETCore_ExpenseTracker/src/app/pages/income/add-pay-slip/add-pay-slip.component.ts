import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-pay-slip',
  templateUrl: './add-pay-slip.component.html',
  styleUrls: ['./add-pay-slip.component.scss']
})
export class AddPaySlipComponent implements OnInit {

  addPaySlipForm: FormGroup;

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
      superAnnuationPct: new FormControl({ value: '', disabled: true, },),
    });
  }

  calculateTaxPct() {
    const netPayCtrl: AbstractControl = this.addPaySlipForm.get('netPay').value;
    const totalEarningsCtrl: AbstractControl = this.addPaySlipForm.get('totalEarnings').value;

    console.log(netPayCtrl);
    console.log(totalEarningsCtrl);

  }

}
