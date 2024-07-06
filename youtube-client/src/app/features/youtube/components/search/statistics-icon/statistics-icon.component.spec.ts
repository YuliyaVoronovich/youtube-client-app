import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsIconComponent } from './statistics-icon.component';

describe('StatisticsIconComponent', () => {
  let component: StatisticsIconComponent;
  let fixture: ComponentFixture<StatisticsIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
