import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuanLyDanhGiaComponent } from './quan-ly-danh-gia-component';

describe('QuanLyDanhGiaComponent', () => {
  let component: QuanLyDanhGiaComponent;
  let fixture: ComponentFixture<QuanLyDanhGiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanLyDanhGiaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuanLyDanhGiaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
