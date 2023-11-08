import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsAsocijacijeComponent } from './statistics-asocijacije.component';

describe('StatisticsAsocijacijeComponent', () => {
  let component: StatisticsAsocijacijeComponent;
  let fixture: ComponentFixture<StatisticsAsocijacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsAsocijacijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsAsocijacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
