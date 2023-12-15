import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingOrderReviewComponent } from './pending-order-review.component';

describe('PendingOrderReviewComponent', () => {
  let component: PendingOrderReviewComponent;
  let fixture: ComponentFixture<PendingOrderReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingOrderReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingOrderReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
