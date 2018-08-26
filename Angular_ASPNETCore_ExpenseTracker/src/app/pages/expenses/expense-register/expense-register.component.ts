import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { FormControl, NgModel } from '@angular/forms';
import { MdSidenav } from "@angular/material";


import { TrackByService } from "../../../core/trackby.service";
import { ConfigService } from "../../../shared/services/config/config.service";
import { Page } from "../../../shared/model/paging/page";

import { ITransaction } from "./transaction";
import { ExpenseRegisterService } from "./expense-register.service";

@Component({
	selector: "expense-register",
	templateUrl: "./expense-register.component.html",
	styleUrls: ["./expense-register.component.scss"]
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
	searchModel = {
		expenseCategoryId: null
	};

	// Search SideBar

	@ViewChild("rightSidenav2") rightSidenav2: MdSidenav;
	navMode = "over";

	// Search Lookups
	expenseCategories: any[];
	tdExpenseCategories: any[];
	expenseCategoryCtrl: FormControl;
	currentExpenseCategory: any;
	@ViewChild(NgModel) modelDir: NgModel;

	constructor(
		private expenseRegisterService: ExpenseRegisterService,
		public config: ConfigService,
		public trackby: TrackByService
	) {

		this.page.pageNumber = 0;
		this.page.size = 20;
	}

	ngOnInit() {
		this.setPage({ offset: 0 });
	}

	/**
  * Populate the table with new data based on the page number
  * @param page The page to select
  */
	setPage(pageInfo) {
		this.page.pageNumber = pageInfo.offset;
		this.searchModel.expenseCategoryId =
			!!this.currentExpenseCategory
				? this.currentExpenseCategory.id
				: null;
		this.expenseRegisterService.getTransactions(this.page, this.searchModel).subscribe(pagedData => {
			this.page.totalElements = pagedData.page.totalElements;
			this.rows = pagedData.individualTransactions;

			this.expenseCategories = pagedData.lookups.expenseCategories;
			this.tdExpenseCategories = [...this.expenseCategories];
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

	filterExpenseCategories(val: string) {
		if (val) {
			const filterValue = val.toLowerCase();
			return this.expenseCategories.filter(category =>
				category.name.toLowerCase().startsWith(filterValue)
			);
		}

		return this.expenseCategories;
	}

	search() {
		console.log(this.modelDir);
		this.page.pageNumber = 0;
		this.searchModel.expenseCategoryId =
			!!this.currentExpenseCategory
				? this.currentExpenseCategory.id
				: null;
		this.expenseRegisterService.getTransactions(this.page, this.searchModel).subscribe(pagedData => {
			this.page.totalElements = pagedData.page.totalElements;
			this.rows = pagedData.individualTransactions;

			this.expenseCategories = pagedData.lookups.expenseCategories;
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
