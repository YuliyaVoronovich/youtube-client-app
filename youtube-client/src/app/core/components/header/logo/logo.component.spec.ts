import { TestBed } from '@angular/core/testing';
import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LogoComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
