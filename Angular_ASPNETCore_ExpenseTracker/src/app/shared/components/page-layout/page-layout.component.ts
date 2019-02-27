import { Output, EventEmitter, Component, Input } from "@angular/core";


@Component({
    selector: 'page-layout',
    templateUrl:'./page-layout.component.html',
})
export class PageLayoutComponent {
    @Input() canAdd:boolean;
    @Output() onAdd: EventEmitter<any> = new EventEmitter<any>();

     onAddClick(){
        this.onAdd.emit();
    }
}