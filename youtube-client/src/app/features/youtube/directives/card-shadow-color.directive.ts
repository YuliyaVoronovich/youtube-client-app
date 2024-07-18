import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { getBorderColor } from '../utils/border-color';

const GENERAL_STYLE = '3px 3px 10px 0px ';

@Directive({
  selector: '[appCardShadowColor]',
  standalone: true,
})
export class CardShadowColorDirective implements OnInit {
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
      'box-shadow',
      `${GENERAL_STYLE} ${getBorderColor(this.publishTime)}`
    );
  }
}
