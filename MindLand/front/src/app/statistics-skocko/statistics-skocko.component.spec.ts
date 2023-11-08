import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsSkockoComponent } from './statistics-skocko.component';

describe('StatisticsSkockoComponent', () => {
  let component: StatisticsSkockoComponent;
  let fixture: ComponentFixture<StatisticsSkockoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsSkockoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsSkockoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
