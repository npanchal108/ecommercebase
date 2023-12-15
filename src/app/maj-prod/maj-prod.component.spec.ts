import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajProdComponent } from './maj-prod.component';

describe('MajProdComponent', () => {
  let component: MajProdComponent;
  let fixture: ComponentFixture<MajProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MajProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
