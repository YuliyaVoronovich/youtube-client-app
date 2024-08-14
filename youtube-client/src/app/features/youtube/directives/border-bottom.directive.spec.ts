import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BorderBottomDirective } from './border-bottom.directive';

@Component({
  template: `<div appBorderBottom publishTime="2024-08-12"></div>`,
  standalone: true,
})
class TestComponent {
  publishTime = '2024-08-12';
}

describe('BorderBottomColorDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: HTMLElement;
  let rendererMock: { setStyle: jest.Mock };

  beforeEach(() => {
    rendererMock = {
      setStyle: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [TestComponent, BorderBottomDirective],
      providers: [{ provide: Renderer2, useValue: rendererMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    directiveElement = fixture.nativeElement.querySelector('div');
  });

  it('should create an instance', () => {
    const directive = new BorderBottomDirective(
      new ElementRef(directiveElement),
      rendererMock as unknown as Renderer2
    );
    expect(directive).toBeTruthy();
  });
});
