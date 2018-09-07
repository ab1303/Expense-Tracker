import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-bulk-edit-modal',
  templateUrl: './bulk-edit.component.html',
  styleUrls: ['./bulk-edit.component.scss']
})
export class BulkEditComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(BulkEditModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


@Component({
  selector: 'app-bulk-edit-modal',
  templateUrl: './bulk-edit-modal.component.html',
  styleUrls: ['./bulk-edit-modal.component.scss']
})
export class BulkEditModalComponent {}
