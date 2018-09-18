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
export class BulkEditModalComponent implements OnInit {

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
  }

  ngOnInit() {
    this.setupModalExpenseCategory();
    this.dialogRef.updateSize("500px", "230px");
  }

  setupModalExpenseCategory() {
    this.filteredExpenseCategories = this.expenseCategoryControl.valueChanges
      .pipe(
        startWith<string | any>(''),
        map(value => !!value && (typeof value === 'string' ? value : value.name)),
        map(name => {
          if (!name) return [...this.expenseCategories];

          const filterValue = name.toLowerCase();
          return this.expenseCategories.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
        })
      );
  }

  displayFn(value: any): string {
		return value && typeof value === "object" ? value.name : value;
	}

  closeDialog() {
    this.dialogRef.close({
      selectedValue: this.expenseCategoryControl.value,
    })
  }

}
