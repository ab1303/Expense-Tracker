import { Component, ViewEncapsulation, Output, EventEmitter, Input, OnInit } from "@angular/core";


@Component({
	selector: "app-search-sidebar",
	templateUrl: "./search-sidebar.component.html",
	styleUrls: ["./search-sidebar.component.scss"],
	encapsulation: ViewEncapsulation.Emulated
})
export class SearchSidebarComponent implements OnInit {

	@Input()
	toggle: boolean;

	@Output()
	searchHandler: EventEmitter<any> = new EventEmitter();

	@Output()
	resetHandler: EventEmitter<any> = new EventEmitter();

	@Output()
	onToggleHandler: EventEmitter<boolean> = new EventEmitter();

	open:boolean;
	searchPosition;
	openSearchStyle = {
		right: '0px',
		zIndex: 30,
		top: '145px',
	};
	closedSearchStyle = {
		right: '-260px',
		zIndex: 30,
		top: '145px',
	};

	constructor(){
		this.searchPosition = this.closedSearchStyle;
	}

	ngOnInit(): void {
		this.open = this.toggle;
	}

	toggleSearch() {
		console.log('toggle clicked;')
		console.log(this.open);
		this.open = !this.open;
		if(this.open){
			this.searchPosition = this.openSearchStyle;
		} else {
			this.searchPosition = this.closedSearchStyle;
		}
		this.onToggleHandler.emit(this.open);
	}

	// overlayClicked() {
	// 	if (this.state.open) {
	// 		//   this.props.onSetOpen(false);
	// 		this.setState({
	// 			open: false,
	// 		});
	// 	}
	// 	this.props.onOverlayClickedHandler();
	// }

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
