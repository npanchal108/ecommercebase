import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouthernQuotesComponent } from './southern-quotes.component';

describe('SouthernQuotesComponent', () => {
  let component: SouthernQuotesComponent;
  let fixture: ComponentFixture<SouthernQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SouthernQuotesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SouthernQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
