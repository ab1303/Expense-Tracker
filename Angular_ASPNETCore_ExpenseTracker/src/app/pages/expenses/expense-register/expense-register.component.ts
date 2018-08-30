import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { FormControl, NgModel } from '@angular/forms';
import { MatDrawer } from "@angular/material";
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { TrackByService } from "../../../core/trackby.service";
import { ConfigService } from "../../../shared/services/config/config.service";
import { Page } from "../../../shared/model/paging/page";

import { ITransaction } from "./transaction";
import { ExpenseRegisterService } from "./expense-register.service";
import { FilterService } from "./filter.service";

@Component({
	selector: "expense-register",
	templateUrl: "./expense-register.component.html",
	styleUrls: ["./expense-register.component.scss"],
	providers:[FilterService]
})
export class ExpenseRegisterComponent implements OnInit {

	// Transactions
	rows = [];
	page = new Page();
	transactions: ITransaction[] = [];


	selected = [];
	temp = [];
	searchValue: string = null;
	isSearchActive: boolean = false;
	isToolbarActive: boolean = false;
	itemsSelected: string = "";
	itemCount: number = 0;
	// searchModel = {
	// 	expenseCategoryId: null
	// };

	// Search SideBar

	@ViewChild("rightSidenav2") rightSidenav2: MatDrawer;
	navMode = "over";

	// Search Lookups
	filteredExpenseCategories: Observable<any[]>;
	expenseCategories: any[];
	tdExpenseCategories: any[];
	expenseCategoryControl: FormControl = new FormControl();
	@ViewChild(NgModel) modelDir: NgModel;

	constructor(
		private expenseRegisterService: ExpenseRegisterService,
		private filterService: FilterService,
		public config: ConfigService,
		public trackby: TrackByService
	) {

		this.page.pageNumber = 0;
		this.page.size = 20;
	}

	ngOnInit() {
		this.setPage({ offset: 0 });
		this.fetchSearchLookups();
	}

	fetchSearchLookups(){
		this.expenseRegisterService.getSearchLookups().subscribe(lookups => {
			this.expenseCategories = lookups.expenseCategories;
			this.tdExpenseCategories = [...this.expenseCategories];

		})
	}

	/**
  * Populate the table with new data based on the page number
  * @param page The page to select
  */
	setPage(pageInfo) {
		this.page.pageNumber = pageInfo.offset;
		this.filterService.expenseCategoryId = !!this.expenseCategoryControl.value && this.expenseCategoryControl.value.id;
		this.expenseRegisterService.getTransactions(this.page, this.filterService).subscribe(pagedData => {
			this.page.totalElements = pagedData.page.totalElements;
			this.rows = pagedData.individualTransactions;
			
			this.filteredExpenseCategories = this.expenseCategoryControl.valueChanges
				.pipe(
					startWith<string | any>(''),
					map(value => typeof value === 'string' ? value : value.name),
					// map(name => name ? this._filter(name) : this.expenseCategories.slice())
					map(name => {
						if (!name) return this.expenseCategories.slice();

						const filterValue = name.toLowerCase();
						return this.expenseCategories.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
					})
				);
		});
	}

	@HostListener("window:resize", ["$event"])
	onResize(event) {
		if (event.target.innerWidth < this.config.breakpoint.desktopLG) {
			this.navMode = "over";
			this.rightSidenav2.close();
		}
		if (event.target.innerWidth > this.config.breakpoint.desktopLG) {
			this.navMode = "side";
			this.rightSidenav2.open();
		}
	}

	displayFn(value: any): string {
		return value && typeof value === "object" ? value.name : value;
	}

	search() {
		this.page.pageNumber = 0;
		this.filterService.expenseCategoryId = !!this.expenseCategoryControl.value && this.expenseCategoryControl.value.id;
		this.expenseRegisterService.getTransactions(this.page, this.filterService).subscribe(pagedData => {
			this.page.totalElements = pagedData.page.totalElements;
			this.rows = pagedData.individualTransactions;

			this.tdExpenseCategories = [...this.expenseCategories];
		});
	}

	onSelect({ selected }) {
		//console.log("Select Event", selected, this.selected);
		//console.log(this.selected.length);
		this.selected.splice(0, this.selected.length);
		this.selected.push(...selected);
		if (selected.length == 1) {
			this.isToolbarActive = true;
			this.itemCount = selected.length;
			this.itemsSelected = "Item Selected";
		} else if (selected.length > 0) {
			this.isToolbarActive = true;
			this.itemCount = selected.length;
			this.itemsSelected = "Items Selected";
		} else {
			this.isToolbarActive = false;
		}
	}

}
