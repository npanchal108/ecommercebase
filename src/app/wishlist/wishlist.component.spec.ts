import { ComponentFixture, TestBed } from '@angular/core/testing';

import { wishlistComponent } from './wishlist.component';

describe('wishlistComponent', () => {
  let component: wishlistComponent;
  let fixture: ComponentFixture<wishlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ wishlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(wishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
