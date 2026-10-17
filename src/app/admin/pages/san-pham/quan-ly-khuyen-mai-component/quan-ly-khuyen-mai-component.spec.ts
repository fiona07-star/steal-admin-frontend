import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuanLyKhuyenMaiComponent } from './quan-ly-khuyen-mai-component';

describe('QuanLyKhuyenMaiComponent', () => {
  let component: QuanLyKhuyenMaiComponent;
  let fixture: ComponentFixture<QuanLyKhuyenMaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanLyKhuyenMaiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuanLyKhuyenMaiComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
