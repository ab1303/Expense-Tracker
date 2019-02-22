import {
  Component,
  TemplateRef,
  ViewChild
} from "../../../../../node_modules/@angular/core";
import {
  BsModalRef,
  BsModalService
} from "../../../../../node_modules/ngx-bootstrap/modal";

@Component({
  selector: "uppy-modal",
  templateUrl: "./uppy-modal.component.html"
})
export class UppyModalComponent {
  bsModalRef: BsModalRef;

  @ViewChild("uppyModalTemplate") uppyModalTemplate: TemplateRef<any>;
  constructor(private modalService: BsModalService) {}

  showUppyUploadModal() {
      // default animated : true causing problem 
    this.bsModalRef = this.modalService.show(this.uppyModalTemplate, {
      animated: false
    });
  }
}
