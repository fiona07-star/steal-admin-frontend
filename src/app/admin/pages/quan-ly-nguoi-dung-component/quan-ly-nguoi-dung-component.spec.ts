import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuanLyNguoiDungComponent } from './quan-ly-nguoi-dung-component';

describe('QuanLyNguoiDungComponent', () => {
  let component: QuanLyNguoiDungComponent;
  let fixture: ComponentFixture<QuanLyNguoiDungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanLyNguoiDungComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuanLyNguoiDungComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
