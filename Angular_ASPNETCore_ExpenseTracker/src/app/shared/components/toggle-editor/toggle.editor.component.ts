

import {
    Component, Input, HostListener,
    ViewChild, ElementRef, TemplateRef,
    ChangeDetectorRef, ViewContainerRef,
    OnInit, AfterViewInit, AfterViewChecked
}
    from "@angular/core";

@Component({
    selector: 'toggle-editor',
    templateUrl: './toggle.editor.component.html'
})
export class ToggleEditor  {
    isEditing: boolean = false;
    hasToggleEdit: boolean = false;
    hasToggleNormal: boolean = false;

    @Input() label: string;

    public editMode() {
        this.isEditing = true;
    }

    public normalMode() {
        this.isEditing = false;
    }

}
