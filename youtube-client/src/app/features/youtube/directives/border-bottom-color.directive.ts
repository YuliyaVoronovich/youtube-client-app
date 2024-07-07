import { Directive, ElementRef, Input, OnInit } from '@angular/core';

const DAY_IN_MILLISECOND = 86400000;
const MONTH_IN_MILLISECOND = DAY_IN_MILLISECOND * 30;
const GENERAL_STYLE = '8px solid ';
const COUNT_MONTHS = 6;
const COUNT_DAYS = 7;

@Directive({
  selector: '[appBorderBottomColor]',
  standalone: true,
})
export class BorderBottomColorDirective implements OnInit {
  @Input() publishTime!: Date;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.setBorderColor();
    this.setBorderRadius();
  }

  private setBorderColor(): void {
    const difference = Date.now() - new Date(this.publishTime).getTime();
    if (difference > MONTH_IN_MILLISECOND * COUNT_MONTHS) {
      this.elementRef.nativeElement.style.borderBottom = `${GENERAL_STYLE} red`;
    } else if (difference > MONTH_IN_MILLISECOND) {
      this.elementRef.nativeElement.style.borderBottom = `${GENERAL_STYLE} yellow`;
    } else if (difference > DAY_IN_MILLISECOND * COUNT_DAYS) {
      this.elementRef.nativeElement.style.borderBottom = `${GENERAL_STYLE} green`;
    } else {
      this.elementRef.nativeElement.style.borderBottom = `${GENERAL_STYLE} blue`;
    }
  }

  private setBorderRadius(): void {
    this.elementRef.nativeElement.style.borderRadius = '0 0 10px 10px';
  }
}
