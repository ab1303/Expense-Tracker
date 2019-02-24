import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
})
export class AddModalComponent implements OnInit {
  model: { categoryName: string, categoryDescription: string } = {
    categoryName: '',
    categoryDescription: ''
  };

  @ViewChild('categoryForm')
  categoryForm: NgForm;
  constructor(
    private dialogRef: MatDialogRef<AddModalComponent>,
  ) { }

  ngOnInit() {
    this.dialogRef.updateSize("600px", "300px");
  }

  onSubmit() {
    this.dialogRef.close({
      model: this.model
    });
  }

  closeDialog() {
    this.dialogRef.close({
    })
  }

}
