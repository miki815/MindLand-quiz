import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishGameComponent } from './finish-game.component';

describe('FinishGameComponent', () => {
  let component: FinishGameComponent;
  let fixture: ComponentFixture<FinishGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
