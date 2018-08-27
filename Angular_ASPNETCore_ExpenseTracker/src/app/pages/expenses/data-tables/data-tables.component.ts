import {
	Component,
	OnInit,
	trigger,
	state,
	style,
	transition,
	animate,
	ElementRef,
	HostListener,
	HostBinding
} from "@angular/core";
import { GlobalState } from "../../../app.state";
import { ConfigService } from "../../../shared/services/config/config.service";

@Component({
	selector: ".content_inner_wrapper",
	templateUrl: "./data-tables.component.html",
	styleUrls: ["./data-tables.component.scss"]
})
export class DataTablesComponent {
	rows = [];
	selected = [];
	temp = [];
	searchValue: string = null;
	isSearchActive: boolean = false;
	isToolbarActive: boolean = false;
	itemsSelected: string = "";
	itemCount: number = 0;
	constructor() {
		this.fetch(data => {
			// cache our list
			this.temp = [...data];
			this.rows = data;
		});
	}

	fetch(cb) {
		const req = new XMLHttpRequest();
		req.open("GET", `assets/data/ecom/productTable.json`);

		req.onload = () => {
			cb(JSON.parse(req.response));
		};

		req.send();
	}
	updateFilter(event) {
		const val = event.target.value.toLowerCase();
		// filter our data
		const temp = this.temp.filter(function(d) {
			return d.productTitle.toLowerCase().indexOf(val) !== -1 || !val;
		});
		// update the rows
		this.rows = temp;
		// Whenever the filter changes, always go back to the first page
		//  this.table.offset = 0;
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
