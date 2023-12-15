import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickOrderPadComponent } from './quick-order-pad.component';

describe('QuickOrderPadComponent', () => {
  let component: QuickOrderPadComponent;
  let fixture: ComponentFixture<QuickOrderPadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuickOrderPadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickOrderPadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
