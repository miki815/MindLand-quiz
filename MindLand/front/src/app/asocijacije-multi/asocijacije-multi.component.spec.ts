import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsocijacijeMultiComponent } from './asocijacije-multi.component';

describe('AsocijacijeMultiComponent', () => {
  let component: AsocijacijeMultiComponent;
  let fixture: ComponentFixture<AsocijacijeMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsocijacijeMultiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsocijacijeMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
