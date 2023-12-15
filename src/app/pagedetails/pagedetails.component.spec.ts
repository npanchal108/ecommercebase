import { ComponentFixture, TestBed } from '@angular/core/testing';

import { pagedetailsComponent } from './pagedetails.component';

describe('pagedetailsComponent', () => {
  let component: pagedetailsComponent;
  let fixture: ComponentFixture<pagedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ pagedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(pagedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
