import { Component } from "@angular/core";


@Component({
    selector: "field-category-mapping",
    templateUrl: "./field-category-mapping.component.html",
    styleUrls: ["./field-category-mapping.component.scss"]
})

export class FieldCategoryMappingComponent {


    onAdd(data){
        console.log(data);
    }

}