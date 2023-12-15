import { TestBed, inject } from '@angular/core/testing';

import { OrderManagementService } from './order-management.service';

describe('OrderManagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderManagementService]
    });
  });

  it('should be created', inject([OrderManagementService], (service: OrderManagementService) => {
    expect(service).toBeTruthy();
  }));
});
