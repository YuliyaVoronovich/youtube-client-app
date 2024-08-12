import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { CustomCard } from '@store/state.model';
import { By } from '@angular/platform-browser';
import * as CardActions from '@store/actions/card.actions';
import { Store } from '@ngrx/store';
import { CustomCardComponent } from './custom-card.component';

describe('CustomCardComponent', () => {
  let component: CustomCardComponent;
  let fixture: ComponentFixture<CustomCardComponent>;

  const storeMock = {
    dispatch: jest.fn(),
  };

  const mockCard = {
    id: '1',
    imageLink: 'https://test.com/test.png',
    title: 'Test Card',
    description: 'This is a test description',
    videoLink: 'https://test.com/test.mp3',
    creationDate: '2024',
    type: 'card',
  } as CustomCard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCardComponent],
      providers: [
        provideMockStore({}),
        provideRouter([]),
        provideAnimations(),
        { provide: Store, useValue: storeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomCardComponent);
    component = fixture.componentInstance;
    component.card = mockCard;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display card title', () => {
    const titleElement = fixture.debugElement.query(
      By.css('mat-card-title')
    ).nativeElement;
    expect(titleElement.textContent).toContain(mockCard.title);
  });

  it('should display image with correct src', () => {
    const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgElement.src).toBe(mockCard.imageLink);
  });

  it('should dispatch deleteCard action on button click', () => {
    const buttonElement = fixture.debugElement.query(
      By.css('app-button')
    ).nativeElement;

    buttonElement.click();
    expect(storeMock.dispatch).toHaveBeenCalledWith(
      CardActions.deleteCard({ id: mockCard.id })
    );
  });
});
