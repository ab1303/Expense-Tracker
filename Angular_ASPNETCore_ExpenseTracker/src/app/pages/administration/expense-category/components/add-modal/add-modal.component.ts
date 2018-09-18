import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss']
})
export class AddModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddModalComponent>,
  ) { }

  ngOnInit() {
    this.dialogRef.updateSize("600px", "300px");
  }

  
  closeDialog() {
    this.dialogRef.close({
    })
  }

}
