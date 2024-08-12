import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardShadowColorDirective } from './card-shadow-color.directive';

@Component({
  template: `<div appCardShadowColor></div>`,
  standalone: true,
})
class TestComponent {}

describe('BorderBottomColorDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directiveElement: HTMLElement;
  let rendererMock: { setStyle: jest.Mock };

  beforeEach(() => {
    rendererMock = {
      setStyle: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [TestComponent, CardShadowColorDirective],
      providers: [{ provide: Renderer2, useValue: rendererMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    directiveElement = fixture.nativeElement.querySelector('div');
  });

  it('should create an instance', () => {
    const directive = new CardShadowColorDirective(
      new ElementRef(directiveElement),
      rendererMock as unknown as Renderer2
    );
    expect(directive).toBeTruthy();
  });
});
