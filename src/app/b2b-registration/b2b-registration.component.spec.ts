import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2bRegistrationComponent } from './b2b-registration.component';

describe('B2bRegistrationComponent', () => {
  let component: B2bRegistrationComponent;
  let fixture: ComponentFixture<B2bRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ B2bRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(B2bRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
