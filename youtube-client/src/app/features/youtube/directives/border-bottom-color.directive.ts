import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { getBorderColor } from '../utils/border-color';

const GENERAL_STYLE = '8px solid ';

@Directive({
  selector: '[appBorderBottomColor]',
  standalone: true,
})
export class BorderBottomColorDirective implements OnInit {
  @Input({ required: true }) publishTime!: string;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.setBorderColor();
    this.setBorderRadius();
  }

  private setBorderColor(): void {
    this.elementRef.nativeElement.style.borderBottom = `${GENERAL_STYLE} ${getBorderColor(this.publishTime)}`;
  }

  private setBorderRadius(): void {
    this.elementRef.nativeElement.style.borderRadius = '0 0 10px 10px';
  }
}
