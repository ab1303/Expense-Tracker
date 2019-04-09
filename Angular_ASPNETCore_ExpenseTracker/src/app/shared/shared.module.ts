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

import { MatMomentDateModule } from "@angular/material-moment-adapter";


import { NguUtilityModule } from 'ngu-utility/ngu-utility.module';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
// ngx-bootstrap4
// http://valor-software.com/ngx-bootstrap/index-bs4.html#/
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { NgxCurrencyModule } from "ngx-currency";


// UI Shared Components
import { FooterComponent } from '../layout/footer/footer.component';
import { AppBackdropComponent } from './components/app_backdrop/app_backdrop.component';
import { SearchSidebarComponent } from './components/search-sidebar/search-sidebar.component';
import { SearchCardComponent } from './components/search-card/search-card.component';


// Custom Directive
import { AutoNumericDirective } from './directives/autoNumeric/ngAutoNumeric';
import { UppyDashboardComponent } from './components/uppy/components/uppy.dashboard/uppy.dashboard.component';
import { UppyComponent } from './components/uppy/uppy.component';
import { UppyContainerDirective } from './components/uppy/uppy.container.directive';
import { UppyModalComponent } from './components/uppy-modal/uppy-modal.component';
import { PageLayoutComponent } from './components/page-layout/page-layout.component';
import { ToggleEditor } from './components/toggle-editor/toggle.editor.component';
import { ToggleEdit } from './components/toggle-editor/toggle.edit.component';
import { ToggleNormal } from './components/toggle-editor/toggle.normal.component';


export const customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ".",
    precision: 2,
    prefix: "$ ",
    suffix: "",
    thousands: ",",
    nullable: true
};

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
        MatMomentDateModule,
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
        PopoverModule.forRoot(),
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
    ],
    declarations: [
        AppBackdropComponent,
        FooterComponent,
        SearchSidebarComponent,
        SearchCardComponent,
        AutoNumericDirective,
        UppyContainerDirective,
        UppyComponent,
        UppyDashboardComponent,
        UppyModalComponent,
        PageLayoutComponent,
        ToggleEditor,
        ToggleEdit,
        ToggleNormal,
    ],
    exports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatMomentDateModule,
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
        NgxCurrencyModule,
        SearchSidebarComponent,
        SearchCardComponent,
        AutoNumericDirective,
        UppyContainerDirective,
        UppyComponent,
        UppyDashboardComponent,
        UppyModalComponent,
        PageLayoutComponent,
        ToggleEditor,
        ToggleEdit,
        ToggleNormal,
    ],
    providers: [
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule
        };
    }
}
