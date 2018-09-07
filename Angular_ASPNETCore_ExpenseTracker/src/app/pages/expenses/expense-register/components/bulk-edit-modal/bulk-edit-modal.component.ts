import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-bulk-edit-modal',
  templateUrl: './bulk-edit-modal.component.html',
  styleUrls: ['./bulk-edit-modal.component.scss']
})
export class BulkEditModalComponent implements OnInit{

  // Edit Category
  filteredExpenseCategories: Observable<any[]>;
  expenseCategories: any[];
  tdExpenseCategories: any[];
  expenseCategoryControl: FormControl = new FormControl();

  /**
   *
   */
  constructor(
    private dialogRef: MatDialogRef<BulkEditModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      lookups: {
        expenseCategoriesLookukp: any,
      }
    }) {
      this.expenseCategories = data.lookups.expenseCategoriesLookukp;
      console.log(data);
  }

  ngOnInit(){
    this.setupModalExpenseCategory();
    this.dialogRef.updateSize("500px", "300px");
  }

  setupModalExpenseCategory() {
    this.filteredExpenseCategories = this.expenseCategoryControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => !!value && (typeof value === 'string' ? value : value.name)),
        map(name => {
          if (!name) return this.expenseCategories.slice();

          const filterValue = name.toLowerCase();
          return this.expenseCategories.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
        })
      );
  }
}
