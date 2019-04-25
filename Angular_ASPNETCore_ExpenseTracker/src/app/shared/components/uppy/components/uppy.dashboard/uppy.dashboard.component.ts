import { Component, Input, OnInit, OnDestroy, AfterViewInit, ElementRef } from "@angular/core";
import * as Dashboard from '@uppy/dashboard';
import * as Uppy from '@uppy/core';
import { v4 } from 'uuid'
import { UppyComponent } from "../../uppy.component";
import { UppyLocaleStrings } from "../../UppyLocaleStrings";

@Component({
  selector: 'uppy-dashboard',
  templateUrl: './uppy.dashboard.component.html',
})
export class UppyDashboardComponent implements AfterViewInit  {
  @Input() note: string;
  @Input() localeStrings: UppyLocaleStrings;

  plugin: Uppy.Plugin;
  dashboardRefClass: string = `DashboardContainer-${v4()}`;
  constructor(private hostElement: ElementRef, private uppyComponent: UppyComponent) {
  }

  ngAfterViewInit(): void {
    const options = {
      id: 'uppy:Dashboard',
      height: 350,
      note: this.note,
      locale: {
        strings: this.localeStrings
      },
      // target:`.${this.dashboardRefClass}`,
      target:this.hostElement.nativeElement,
      replaceTargetContent: true,
      inline: true,
      proudlyDisplayPoweredByUppy: false
    };

    this.uppyComponent.Uppy.use(Dashboard, options);
  }

}
