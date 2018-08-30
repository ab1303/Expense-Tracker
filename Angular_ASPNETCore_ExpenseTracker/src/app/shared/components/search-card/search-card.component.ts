import { Component, ViewEncapsulation, Output, EventEmitter, Input, OnInit } from "@angular/core";


@Component({
	selector: "app-search-card",
	templateUrl: "./search-card.component.html",
	styleUrls: ["./search-card.component.scss"],
	encapsulation: ViewEncapsulation.Emulated
})
export class SearchCardComponent {

	@Input()
	toggle: boolean;

	@Output()
	searchHandler: EventEmitter<any> = new EventEmitter();

	@Output()
	resetHandler: EventEmitter<any> = new EventEmitter();

	constructor(){
	}


	submit(e) {
		e.preventDefault();
	}

	search() {
		this.searchHandler.emit();
	}

	reset() {
		this.resetHandler.emit();
	}


}
