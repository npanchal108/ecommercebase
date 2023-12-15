import { ComponentFixture, TestBed } from '@angular/core/testing';

import { userprofileComponent } from './userprofile.component';

describe('UserprofileComponent', () => {
  let component: userprofileComponent;
  let fixture: ComponentFixture<userprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ userprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(userprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
