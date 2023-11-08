import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsSlovotekaComponent } from './statistics-slovoteka.component';

describe('StatisticsSlovotekaComponent', () => {
  let component: StatisticsSlovotekaComponent;
  let fixture: ComponentFixture<StatisticsSlovotekaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsSlovotekaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsSlovotekaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
