import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChiTietDonHangComponent } from './chi-tiet-don-hang-component';

describe('ChiTietDonHangComponent', () => {
  let component: ChiTietDonHangComponent;
  let fixture: ComponentFixture<ChiTietDonHangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiTietDonHangComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChiTietDonHangComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
