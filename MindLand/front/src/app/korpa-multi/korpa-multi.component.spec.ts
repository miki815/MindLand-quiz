import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorpaMultiComponent } from './korpa-multi.component';

describe('KorpaMultiComponent', () => {
  let component: KorpaMultiComponent;
  let fixture: ComponentFixture<KorpaMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KorpaMultiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KorpaMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
