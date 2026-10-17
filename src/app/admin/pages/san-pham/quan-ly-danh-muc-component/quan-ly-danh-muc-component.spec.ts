import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuanLyDanhMucComponent } from './quan-ly-danh-muc-component';

describe('QuanLyDanhMucComponent', () => {
  let component: QuanLyDanhMucComponent;
  let fixture: ComponentFixture<QuanLyDanhMucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanLyDanhMucComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuanLyDanhMucComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
