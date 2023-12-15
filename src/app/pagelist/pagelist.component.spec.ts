import { ComponentFixture, TestBed } from '@angular/core/testing';

import { pagelistComponent } from './pagelist.component';

describe('pagelistComponent', () => {
  let component: pagelistComponent;
  let fixture: ComponentFixture<pagelistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ pagelistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(pagelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
