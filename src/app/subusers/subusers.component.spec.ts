import { ComponentFixture, TestBed } from '@angular/core/testing';

import { subusersComponent } from './subusers.component';

describe('subusersComponent', () => {
  let component: subusersComponent;
  let fixture: ComponentFixture<subusersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ subusersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(subusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
