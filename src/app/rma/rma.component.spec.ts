import { ComponentFixture, TestBed } from '@angular/core/testing';

import { rmaComponent } from './rma.component';

describe('rmaComponent', () => {
  let component: rmaComponent;
  let fixture: ComponentFixture<rmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ rmaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(rmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
