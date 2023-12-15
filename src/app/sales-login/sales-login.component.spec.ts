import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesLoginComponent } from './sales-login.component';

describe('SalesLoginComponent', () => {
  let component: SalesLoginComponent;
  let fixture: ComponentFixture<SalesLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
