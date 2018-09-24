import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {
  model: any = {};
  constructor(
    private dialogRef: MatDialogRef<AddModalComponent>,
  ) { }

  ngOnInit() {
    this.dialogRef.updateSize("600px", "300px");
  }

  onSubmit(form: NgForm){
    console.log(form);
    console.log("submitted");
  }
  
  closeDialog() {
    this.dialogRef.close({
    })
  }

}
