import { ComponentFixture, TestBed } from '@angular/core/testing';

import { k2cRegistrationComponent } from './k2c-registration.component';

describe('k2cRegistrationComponent', () => {
  let component: k2cRegistrationComponent;
  let fixture: ComponentFixture<k2cRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ k2cRegistrationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(k2cRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
