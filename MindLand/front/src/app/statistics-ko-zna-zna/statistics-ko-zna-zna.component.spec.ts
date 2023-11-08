import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsKoZnaZnaComponent } from './statistics-ko-zna-zna.component';

describe('StatisticsKoZnaZnaComponent', () => {
  let component: StatisticsKoZnaZnaComponent;
  let fixture: ComponentFixture<StatisticsKoZnaZnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticsKoZnaZnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsKoZnaZnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
