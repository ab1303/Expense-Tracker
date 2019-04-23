import { Component } from "@angular/core";


@Component({
    selector: "field-category-mapping",
    templateUrl: "./field-category-mapping.component.html",
    styleUrls: ["./field-category-mapping.component.scss"]
})

export class FieldCategoryMappingComponent {

    editableText = 'test value';

    saveEditable(value) {
        //call to http service
        console.log('http.service: ' + value);
        console.log('editableText: ' + this.editableText);
      }

    onAdd(data){
        console.log(data);
    }

}