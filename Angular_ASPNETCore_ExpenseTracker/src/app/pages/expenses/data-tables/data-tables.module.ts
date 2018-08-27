import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DataTablesComponent } from "./data-tables.component";
import { SharedModule } from "../../../shared/shared.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
const DATA_TABLES_ROUTE = [{ path: "", component: DataTablesComponent }];

@NgModule({
	declarations: [DataTablesComponent],
	imports: [
		CommonModule,
		SharedModule,
		NgxDatatableModule,
		RouterModule.forChild(DATA_TABLES_ROUTE)
	]
})
export class DataTablesModule {}
