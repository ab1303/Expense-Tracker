import { Component, Input, OnInit, AfterViewInit, ViewEncapsulation, ChangeDetectionStrategy } from "@angular/core";
import { Subject } from "rxjs";
import { UppyService } from "./uppy.service";
import { v4 } from 'uuid';


export type UppyPluginConfigurations = [
    String,
    any
  ][];


  
@Component({
    selector: 'uppy',
    templateUrl: './uppy.component.html',
    styleUrls: ['./uppy.component.css',],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class UppyComponent implements OnInit, AfterViewInit {
    @Input() plugins: UppyPluginConfigurations = []
    @Input() on: Subject<[string, any, any, any]>
  
    uuid = v4();

    constructor(public uppyService: UppyService) {
    }
  
    ngOnInit() {
    }
  
    ngAfterViewInit() {
      const uppyInstance = this.uppyService.configure(this.plugins, this.uuid)
  
      const events = ['file-added', 'file-removed', 'upload', 'upload-progress', 'upload-success', 'complete', 'upload-error', 'info-visible', 'info-hidden']
  
      events.forEach(ev => uppyInstance.on(ev, (data1, data2, data3) => {
        if (this.on)
          this.on.next([ev, data1, data2, data3])
  
      }))
  
    }
  
  }
  