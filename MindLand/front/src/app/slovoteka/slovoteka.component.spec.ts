import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlovotekaComponent } from './slovoteka.component';

describe('SlovotekaComponent', () => {
  let component: SlovotekaComponent;
  let fixture: ComponentFixture<SlovotekaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlovotekaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlovotekaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
