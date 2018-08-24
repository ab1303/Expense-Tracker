import { Component, OnInit, ViewChild, HostListener } from "@angular/core";
import { ITransaction } from "./transaction";
import { ExpenseRegisterService } from "./expense-register.service";
import { TrackByService } from "../../../core/trackby.service";
import { MdSidenav } from "@angular/material";
import { ConfigService } from "../../../shared/services/config/config.service";

@Component({
	selector: "expense-register",
	templateUrl: "./expense-register.component.html",
	styleUrls: ["./expense-register.component.scss"]
})
export class ExpenseRegisterComponent implements OnInit {
	transactions: ITransaction[] = [];
	rows = [];
	selected = [];
	temp = [];
	searchValue: string = null;
	isSearchActive: boolean = false;
	isToolbarActive: boolean = false;
	itemsSelected: string = "";
	itemCount: number = 0;
	@ViewChild("rightSidenav2") rightSidenav2: MdSidenav;
	navMode = "side";
	constructor(
		private expenseRegisterService: ExpenseRegisterService,
		public config: ConfigService,
		public trackby: TrackByService
	) { }

	ngOnInit() {
		this.expenseRegisterService.getTransactions().subscribe(data => {
			// this.transactions = data.transactions;
			this.rows = data.individualTransactions;
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

	triggerClose(event) {
		this.rows = this.temp;
		this.searchValue = "";
		this.isSearchActive = !this.isSearchActive;
	}
	onActivate(event) {
		//console.log("Activate Event", event);
	}

	add() {
		this.selected.push(this.rows[1], this.rows[3]);
	}

	update() {
		this.selected = [this.rows[1], this.rows[3]];
	}

	remove() {
		this.selected = [];
	}
}
