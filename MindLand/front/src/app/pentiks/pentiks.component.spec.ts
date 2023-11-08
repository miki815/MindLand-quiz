import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PentiksComponent } from './pentiks.component';

describe('PentiksComponent', () => {
  let component: PentiksComponent;
  let fixture: ComponentFixture<PentiksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PentiksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PentiksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
