import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from '@core/components/header/header/header.component';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { SearchFormComponent } from '../search-form/search-form.component';
import { UserInfoComponent } from '../user-info/user-info.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideMockStore({}), provideRouter([]), provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist SearchFormComponent', () => {
    const element = fixture.debugElement.query(
      By.directive(SearchFormComponent)
    );
    expect(element).toBeTruthy();
  });

  it('should exist UserInfoComponent', () => {
    const element = fixture.debugElement.query(By.directive(UserInfoComponent));
    expect(element).toBeTruthy();
  });
});
