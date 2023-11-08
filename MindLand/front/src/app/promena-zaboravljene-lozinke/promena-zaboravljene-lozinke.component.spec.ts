import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromenaZaboravljeneLozinkeComponent } from './promena-zaboravljene-lozinke.component';

describe('PromenaZaboravljeneLozinkeComponent', () => {
  let component: PromenaZaboravljeneLozinkeComponent;
  let fixture: ComponentFixture<PromenaZaboravljeneLozinkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromenaZaboravljeneLozinkeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromenaZaboravljeneLozinkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
