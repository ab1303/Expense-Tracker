import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CategoryMapping } from '../types/category-mapping.model';


@Component({
    selector: "category-mapping-table",
    templateUrl: "./category-mapping-table.component.html",
    styleUrls: ["./category-mapping-table.component.scss"],
    encapsulation: ViewEncapsulation.None,
})
export class CategoryMappingTableComponent{
    
    @Input() categoryMappingsArray: CategoryMapping[]
    @Output() removeMapping = new EventEmitter<number>();

}