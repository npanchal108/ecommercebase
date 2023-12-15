import { ComponentFixture, TestBed } from '@angular/core/testing';

import { B2cRegistrationComponent } from './b2c-registration.component';

describe('B2cRegistrationComponent', () => {
  let component: B2cRegistrationComponent;
  let fixture: ComponentFixture<B2cRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ B2cRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(B2cRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
