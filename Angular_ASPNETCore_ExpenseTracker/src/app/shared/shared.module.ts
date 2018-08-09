// Angular
// https://angular.io/
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Angular Material
// https://material.angular.io/
import {
	MdButtonModule,
	MdButtonToggleModule,
	MdCardModule,
	MdCheckboxModule,
	MdDatepickerModule,
	MdIconModule,
	MdRadioModule,
	MdRippleModule,
	MdSidenavModule,
	StyleModule
} from '@angular/material';
import { NguUtilityModule } from 'ngu-utility/ngu-utility.module';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
// ngx-bootstrap4
// http://valor-software.com/ngx-bootstrap/index-bs4.html#/
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';



// UI Shared Components
import { FooterComponent } from '../layout/footer/footer.component';
import { AppBackdropComponent } from './components/app_backdrop/app_backdrop.component';



@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MdButtonModule,
		MdButtonToggleModule,
		MdCardModule,
		MdCheckboxModule,
		MdIconModule,
		MdRadioModule,
		MdRippleModule,
		MdSidenavModule,
		StyleModule,
		NguUtilityModule,
		BsDropdownModule.forRoot(),
		AlertModule.forRoot(),
		TabsModule.forRoot(),
		MalihuScrollbarModule.forRoot(),
		ModalModule.forRoot(),
		PopoverModule.forRoot()
	],
	declarations: [
		AppBackdropComponent,
		FooterComponent
	],
	exports: [
		CommonModule,
		FormsModule,
		MdButtonModule,
		MdButtonToggleModule,
		MdCardModule,
		MdCheckboxModule,
		MdIconModule,
		MdRadioModule,
		MdRippleModule,
		MdSidenavModule,
		StyleModule,
		NguUtilityModule,
		AppBackdropComponent,
		ReactiveFormsModule,
		TabsModule,
		BsDropdownModule,
		AlertModule,
		MalihuScrollbarModule,
		ModalModule,
		PopoverModule
	]
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule
		};
	}
}
