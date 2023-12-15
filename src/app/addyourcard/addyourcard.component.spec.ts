import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddyourcardComponent } from './addyourcard.component';

describe('AddyourcardComponent', () => {
  let component: AddyourcardComponent;
  let fixture: ComponentFixture<AddyourcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddyourcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddyourcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
