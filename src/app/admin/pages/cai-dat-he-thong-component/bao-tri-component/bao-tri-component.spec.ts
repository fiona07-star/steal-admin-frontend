import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaoTriComponent } from './bao-tri-component';

describe('BaoTriComponent', () => {
  let component: BaoTriComponent;
  let fixture: ComponentFixture<BaoTriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaoTriComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaoTriComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
