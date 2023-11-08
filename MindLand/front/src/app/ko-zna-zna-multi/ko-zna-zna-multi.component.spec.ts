import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KoZnaZnaMultiComponent } from './ko-zna-zna-multi.component';

describe('KoZnaZnaMultiComponent', () => {
  let component: KoZnaZnaMultiComponent;
  let fixture: ComponentFixture<KoZnaZnaMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KoZnaZnaMultiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KoZnaZnaMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
