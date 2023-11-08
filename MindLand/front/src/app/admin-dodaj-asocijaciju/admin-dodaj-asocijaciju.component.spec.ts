import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDodajAsocijacijuComponent } from './admin-dodaj-asocijaciju.component';

describe('AdminDodajAsocijacijuComponent', () => {
  let component: AdminDodajAsocijacijuComponent;
  let fixture: ComponentFixture<AdminDodajAsocijacijuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDodajAsocijacijuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDodajAsocijacijuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
