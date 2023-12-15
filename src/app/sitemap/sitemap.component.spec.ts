import { ComponentFixture, TestBed } from '@angular/core/testing';

import { sitemapComponent } from './sitemap.component';

describe('UserprofileComponent', () => {
  let component: sitemapComponent;
  let fixture: ComponentFixture<sitemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ sitemapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(sitemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
