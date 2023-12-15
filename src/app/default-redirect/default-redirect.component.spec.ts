import { ComponentFixture, TestBed } from '@angular/core/testing';
import { defaultredirectComponent } from './default-redirect.component';

describe('defaultredirectComponent', () => {
  let component: defaultredirectComponent;
  let fixture: ComponentFixture<defaultredirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ defaultredirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(defaultredirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
