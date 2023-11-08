import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojBrojMultiComponent } from './moj-broj-multi.component';

describe('MojBrojMultiComponent', () => {
  let component: MojBrojMultiComponent;
  let fixture: ComponentFixture<MojBrojMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MojBrojMultiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MojBrojMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
