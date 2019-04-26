import { Component, TemplateRef, ViewChild, Input } from "../../../../../node_modules/@angular/core";
import { BsModalRef, BsModalService } from "../../../../../node_modules/ngx-bootstrap/modal";

@Component({
    selector: "uppy-modal",
    template: `
        <ng-template #uppyModalTemplate>
            <div class="modal-header">
                <h4 class="modal-title float-left">Upload Expense Sheet</h4>
                <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="container">
                    <div class="row" uppy-container>
                        <uppy [on]="uppyEvent" parentId="2" [fileUploadUrl]="fileUploadUrl"></uppy>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default btn-flat" (click)="bsModalRef.hide()">
                    Cancel
                </button>
                <button type="button" class="btn btn-accent">Ok</button>
            </div>
        </ng-template>
    `
    // templateUrl: "./uppy-modal.component.html"
})
export class UppyModalComponent {
    @Input("fileUploadUrl") fileUploadUrl: string;
    @ViewChild("uppyModalTemplate") uppyModalTemplate: TemplateRef<any>;

    bsModalRef: BsModalRef;
    constructor(private modalService: BsModalService) {}

    showUppyUploadModal() {
        // default animated : true causing problem
        this.bsModalRef = this.modalService.show(this.uppyModalTemplate, {
            animated: false
        });
    }
}
