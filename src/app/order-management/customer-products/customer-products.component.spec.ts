import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductsComponent } from './customer-products.component';

describe('CustomerProductsComponent', () => {
  let component: CustomerProductsComponent;
  let fixture: ComponentFixture<CustomerProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
