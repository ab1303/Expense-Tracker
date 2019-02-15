import { Component, Input, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
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
  constructor() {
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
      target:`.${this.dashboardRefClass}`,
      replaceTargetContent: true,
      inline: true
    };

    this.uppy.use(Dashboard, options);
    this.plugin = this.uppy.getPlugin(options.id);
  }

  ngOnDestroy(): void {
    this.uppy.removePlugin(this.plugin);
  }

}
