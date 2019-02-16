import { Directive, Optional, Host, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
    exportAs: 'uppy-container',
    selector: '[uppy-container]',
})
export class UppyContainerDirective implements AfterViewInit {

    constructor(
        @Host() private hostElement: ElementRef
    ) {

    }
    
    ngAfterViewInit(): void {
        console.log(this.hostElement);
    }

}