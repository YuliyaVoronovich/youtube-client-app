import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { mockVideo } from '@store/state.model.mock';
import { SearchItemComponent } from './search-item.component';

describe('FilterComponent', () => {
  let component: SearchItemComponent;
  let fixture: ComponentFixture<SearchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchItemComponent],
      providers: [provideRouter([]), provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit video when toggleFavorite is called', () => {
    const videoEmitSpy = jest.spyOn(component.videoEmit, 'emit');

    component.toggleFavorite(mockVideo);

    expect(videoEmitSpy).toHaveBeenCalledWith(mockVideo);
  });
});
