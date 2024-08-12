import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CardFormComponent } from './card-form.component';

describe('CardFormComponent', () => {
  let component: CardFormComponent;
  let fixture: ComponentFixture<CardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFormComponent],
      providers: [provideMockStore({}), provideRouter([]), provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(CardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form correctly', () => {
    expect(component.createCardForm).toBeDefined();
    expect(component.createCardForm.controls.title).toBeDefined();
    expect(component.createCardForm.controls.description).toBeDefined();
    expect(component.createCardForm.controls.imageLink).toBeDefined();
    expect(component.createCardForm.controls.videoLink).toBeDefined();
    expect(component.createCardForm.controls.creationDate).toBeDefined();
    expect(component.createCardForm.controls.tags).toBeDefined();
  });

  it('should add a tag to the form', () => {
    const initialTagsLength = component.tags.controls.length;
    component.addTag();
    fixture.detectChanges();
    expect(component.tags.controls.length).toEqual(initialTagsLength + 1);
  });

  it('should reset the form correctly', () => {
    component.createCardForm.controls.title.setValue('Test Title');
    component.createCardForm.controls.description.setValue('Test Description');
    component.createCardForm.controls.imageLink.setValue(
      'https://example.com/image.jpg'
    );
    component.createCardForm.controls.videoLink.setValue(
      'https://example.com/video.mp4'
    );
    component.createCardForm.controls.creationDate.setValue('2023-05-01');
    component.addTag();
    component.resetForm();
    fixture.detectChanges();
    expect(component.createCardForm.controls.title.value).toEqual(null);
    expect(component.createCardForm.controls.description.value).toEqual(null);
    expect(component.createCardForm.controls.imageLink.value).toEqual(null);
    expect(component.createCardForm.controls.videoLink.value).toEqual(null);
    expect(component.createCardForm.controls.creationDate.value).toEqual(null);
    expect(component.tags.controls.length).toEqual(0);
    expect(component.isShowIconCreate).toBeTruthy();
  });
});
