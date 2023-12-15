import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqlistComponent } from './rfqlist.component';

describe('RfqlistComponent', () => {
  let component: RfqlistComponent;
  let fixture: ComponentFixture<RfqlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RfqlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
