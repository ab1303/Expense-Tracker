import { Component, Input, OnInit, OnDestroy, AfterViewInit, ElementRef } from "@angular/core";
import * as Dashboard from '@uppy/dashboard';
import * as Uppy from '@uppy/core';
import { v4 } from 'uuid'
import { UppyLocaleStrings } from "../../uppy.component";

@Component({
  selector: 'uppy-dashboard',
  templateUrl: './uppy.dashboard.component.html',
})
export class UppyDashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @Input() uppy: Uppy.Uppy;
  @Input() height: number;
  @Input() note: string;
  @Input() localeStrings: UppyLocaleStrings;

  plugin: Uppy.Plugin;
  dashboardRefClass: string = `DashboardContainer-${v4()}`;
  constructor(private hostElement: ElementRef) {
  }

  ngOnInit() {
    const uppy = this.uppy
  
  }

  ngAfterViewInit(): void {
    const options = {
      id: 'uppy:Dashboard',
      height: this.height,
      note: this.note,
      locale: {
        strings: this.localeStrings
      },
      // target:`.${this.dashboardRefClass}`,
      target:this.hostElement.nativeElement,
      replaceTargetContent: true,
      inline: true
    };

    this.uppy.use(Dashboard, options);

    // TODO: AE-13
    this.plugin = this.uppy.getPlugin(options.id);
  }

  ngOnDestroy(): void {
    this.uppy.removePlugin(this.plugin);
  }

}
