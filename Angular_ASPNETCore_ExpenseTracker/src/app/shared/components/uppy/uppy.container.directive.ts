import { Directive, Optional, Host, ElementRef, AfterViewInit, Renderer2, OnInit } from '@angular/core';

@Directive({
    exportAs: 'uppy-container',
    selector: '[uppy-container]',
})
export class UppyContainerDirective implements OnInit  {
    
    constructor(
        @Host() private hostElement: ElementRef,
        private renderer: Renderer2
    ) {

    }

    ngOnInit(): void {
        this.renderer.setStyle(this.hostElement.nativeElement,'display', 'block');
    }
}