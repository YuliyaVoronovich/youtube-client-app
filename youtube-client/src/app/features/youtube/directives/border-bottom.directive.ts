import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { getBorderColor } from '../utils/border-color';

const GENERAL_STYLE = '8px solid ';

@Directive({
  selector: '[appBorderBottom]',
  standalone: true,
})
export class BorderBottomDirective implements OnInit {
  @Input({ required: true }) publishTime!: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.setBorderColor();
    this.setBorderRadius();
  }

  private setBorderColor(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'border-bottom',
      `${GENERAL_STYLE} ${getBorderColor(this.publishTime)}`
    );
  }

  private setBorderRadius(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'border-radius',
      '0 0 10px 10px'
    );
  }
}
