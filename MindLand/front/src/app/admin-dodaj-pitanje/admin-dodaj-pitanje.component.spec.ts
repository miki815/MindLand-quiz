import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDodajPitanjeComponent } from './admin-dodaj-pitanje.component';

describe('AdminDodajPitanjeComponent', () => {
  let component: AdminDodajPitanjeComponent;
  let fixture: ComponentFixture<AdminDodajPitanjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDodajPitanjeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDodajPitanjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
