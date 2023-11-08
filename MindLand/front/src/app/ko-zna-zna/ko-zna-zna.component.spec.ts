import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoZnaZnaComponent } from './ko-zna-zna.component';

describe('KoZnaZnaComponent', () => {
  let component: KoZnaZnaComponent;
  let fixture: ComponentFixture<KoZnaZnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KoZnaZnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KoZnaZnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
