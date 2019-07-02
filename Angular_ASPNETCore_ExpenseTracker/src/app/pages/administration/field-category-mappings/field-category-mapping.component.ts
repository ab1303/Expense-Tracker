import { Component } from "@angular/core";
import { Subject, Observable } from "rxjs/Rx";


@Component({
    selector: "field-category-mapping",
    templateUrl: "./field-category-mapping.component.html",
    styleUrls: ["./field-category-mapping.component.scss"]
})

export class FieldCategoryMappingComponent {

    private sourceValues: string[] = [];
    private sourceValuesSubject: Subject<string[]> = new Subject<string[]>();
    private sourceValuesStream$: Observable<Array<string>> = this.sourceValuesSubject.asObservable();

    editableText:string;
    
    constructor(){
         this.sourceValuesStream$.subscribe(x => console.log(x))
    }


    saveEditable(value) {
        //call to http service
      }

    onAddSourceItem(data){
        if(!data) return;
        this.sourceValues.push(data);
        this.sourceValuesSubject.next(this.sourceValues);
    }

    onRemoveItem(data){
        console.log(data);
        if(!data) return;
        this.sourceValues = this.sourceValues.filter(s => s !== data);
        this.sourceValuesSubject.next(this.sourceValues);
    }

}