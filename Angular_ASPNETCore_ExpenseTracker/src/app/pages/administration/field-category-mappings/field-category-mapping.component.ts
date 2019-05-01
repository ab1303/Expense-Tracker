import { Component } from "@angular/core";


@Component({
    selector: "field-category-mapping",
    templateUrl: "./field-category-mapping.component.html",
    styleUrls: ["./field-category-mapping.component.scss"]
})

export class FieldCategoryMappingComponent {

    private sourceValues: string[] = [];
    editableText:string;
    
    saveEditable(value) {
        if(!value) return;
        this.sourceValues.push(value);
        //call to http service
        console.log('http.service: ' + value);
      }

    onAdd(data){
        console.log(data);
    }

}