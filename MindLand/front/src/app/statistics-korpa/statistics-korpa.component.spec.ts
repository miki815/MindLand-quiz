import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsKorpaComponent } from './statistics-korpa.component';

describe('StatisticsKorpaComponent', () => {
  let component: StatisticsKorpaComponent;
  let fixture: ComponentFixture<StatisticsKorpaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsKorpaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsKorpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
