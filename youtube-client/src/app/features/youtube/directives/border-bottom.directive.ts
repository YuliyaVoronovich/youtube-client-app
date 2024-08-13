import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { getBorderColor } from '../utils/border-color';

const GENERAL_STYLE = '6px solid ';

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
  }

  private setBorderColor(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'border-bottom',
      `${GENERAL_STYLE} ${getBorderColor(this.publishTime)}`
    );
  }
}
