import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsocijacijeComponent } from './asocijacije.component';

describe('AsocijacijeComponent', () => {
  let component: AsocijacijeComponent;
  let fixture: ComponentFixture<AsocijacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsocijacijeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsocijacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
