import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkockoMultiComponent } from './skocko-multi.component';

describe('SkockoMultiComponent', () => {
  let component: SkockoMultiComponent;
  let fixture: ComponentFixture<SkockoMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkockoMultiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkockoMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
