import { Component, ViewEncapsulation, Output, EventEmitter, Input, OnInit } from "@angular/core";
import { FormGroup } from '@angular/forms';

@Component({
	selector: "app-search-card",
	templateUrl: "./search-card.component.html",
	styleUrls: ["./search-card.component.scss"],
	encapsulation: ViewEncapsulation.Emulated
})
export class SearchCardComponent implements OnInit {

	myform: FormGroup;
	@Input()
	toggle: boolean;

	@Output()
	searchHandler: EventEmitter<any> = new EventEmitter();

	@Output()
	resetHandler: EventEmitter<any> = new EventEmitter();

	constructor() {
	}

	ngOnInit(): void {
	}

	submit(e) {
		e.preventDefault();
	}

	search() {
		this.searchHandler.emit();
	}

	reset(searchformHandle) {
		this.resetHandler.emit();
	}


}
