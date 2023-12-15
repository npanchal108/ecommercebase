import { ComponentFixture, TestBed } from '@angular/core/testing';

import { infopageComponent } from './infopage.component';

describe('infopageComponent', () => {
  let component: infopageComponent;
  let fixture: ComponentFixture<infopageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ infopageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(infopageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
