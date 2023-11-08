import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsGlobalComponent } from './statistics-global.component';

describe('StatisticsGlobalComponent', () => {
  let component: StatisticsGlobalComponent;
  let fixture: ComponentFixture<StatisticsGlobalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsGlobalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
