// Angular
// https://angular.io/
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Angular Material
// https://material.angular.io/
import {
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatRadioModule,
    MatRippleModule,
    MatSidenavModule,
	MatTabsModule,
	MatAutocompleteModule,
	MatInputModule,
	MatToolbarModule,
	MatSlideToggleModule,
	MatDialogModule,
} from "@angular/material";

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
import { SearchSidebarComponent } from './components/search-sidebar/search-sidebar.component';
import { SearchCardComponent } from './components/search-card/search-card.component';



@NgModule({
	imports: [
		CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatRadioModule,
        MatRippleModule,
        MatSidenavModule,
        MatTabsModule,
        MatDialogModule,
        BsDropdownModule.forRoot(),
        AlertModule.forRoot(),
        TabsModule.forRoot(),
        MalihuScrollbarModule.forRoot(),
        ModalModule.forRoot(),
        PopoverModule.forRoot()
	],
	declarations: [
		AppBackdropComponent,
		FooterComponent,
		SearchSidebarComponent,
		SearchCardComponent,
	],
	exports: [
		CommonModule,
        FormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        MatRadioModule,
        MatRippleModule,
        MatSidenavModule,
        MatTabsModule,
        AppBackdropComponent,
        ReactiveFormsModule,
        TabsModule,
        BsDropdownModule,
        AlertModule,
        MalihuScrollbarModule,
        ModalModule,
		PopoverModule,
		MatInputModule,
		MatAutocompleteModule,
        MatToolbarModule,
        MatSlideToggleModule,
        MatDialogModule,
		SearchSidebarComponent,
		SearchCardComponent,
	]
})
export class SharedModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: SharedModule
		};
	}
}
