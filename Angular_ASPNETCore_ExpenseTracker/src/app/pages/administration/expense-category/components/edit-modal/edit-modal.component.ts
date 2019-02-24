import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
})
export class EditModalComponent implements OnInit {
  model: { categoryName: string, categoryDescription: string } = {
    categoryName: '',
    categoryDescription: ''
  };

  @ViewChild('categoryForm')
  categoryForm: NgForm;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { name: string, description: string},
    private dialogRef: MatDialogRef<EditModalComponent>,
  ) { 
    this.model.categoryName = data.name;
    this.model.categoryDescription = data.description;
  }

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
