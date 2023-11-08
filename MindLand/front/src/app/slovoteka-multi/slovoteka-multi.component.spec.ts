import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlovotekaMultiComponent } from './slovoteka-multi.component';

describe('SlovotekaMultiComponent', () => {
  let component: SlovotekaMultiComponent;
  let fixture: ComponentFixture<SlovotekaMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlovotekaMultiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlovotekaMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
