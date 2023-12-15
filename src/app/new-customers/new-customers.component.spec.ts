import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomersComponent } from './new-customers.component';

describe('NewCustomersComponent', () => {
  let component: NewCustomersComponent;
  let fixture: ComponentFixture<NewCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCustomersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
