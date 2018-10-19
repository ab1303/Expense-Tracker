import { Directive, HostListener, ElementRef, forwardRef, Renderer2, AfterViewInit, OnInit } from '@angular/core';
import AutoNumeric from 'autonumeric';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";


export const CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AutoNumericDirective),
  multi: true
};


@Directive({
  selector: '[etsAutoNumeric]',
  providers: [CURRENCYMASKDIRECTIVE_VALUE_ACCESSOR]
})
export class AutoNumericDirective implements OnInit, AfterViewInit, ControlValueAccessor {

  anElement: any;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.anElement = new AutoNumeric(this.elementRef.nativeElement, 'dollar');
  }

  ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'textAlign', 'right');
  }

  ngAfterViewInit(): void {
    // this.anElement = new AutoNumeric(this.elementRef.nativeElement, {
    //   currencySymbol : '$',
    //   decimalCharacter : '.',
    //   digitGroupSeparator : ',',
    //   currencySymbolPlacement    : AutoNumeric.options.currencySymbolPlacement.prefix,
    // });

    
  }

  writeValue(value: number): void {
    this.anElement.set(value);
  }

  registerOnChange(callbackFunction: Function): void {
    console.log(this.anElement);
    callbackFunction(this.anElement.rawValue);
  }

  registerOnTouched(callbackFunction: Function): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

}