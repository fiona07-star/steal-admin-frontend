import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChiTietKhuyenMaiComponent } from './chi-tiet-khuyen-mai-component';

describe('ChiTietKhuyenMaiComponent', () => {
  let component: ChiTietKhuyenMaiComponent;
  let fixture: ComponentFixture<ChiTietKhuyenMaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiTietKhuyenMaiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChiTietKhuyenMaiComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
