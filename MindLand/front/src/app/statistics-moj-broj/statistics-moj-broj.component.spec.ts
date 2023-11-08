import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsMojBrojComponent } from './statistics-moj-broj.component';

describe('StatisticsMojBrojComponent', () => {
  let component: StatisticsMojBrojComponent;
  let fixture: ComponentFixture<StatisticsMojBrojComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsMojBrojComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsMojBrojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
