import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenShipmentComponent } from './open-shipment.component';

describe('OpenShipmentComponent', () => {
  let component: OpenShipmentComponent;
  let fixture: ComponentFixture<OpenShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenShipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
