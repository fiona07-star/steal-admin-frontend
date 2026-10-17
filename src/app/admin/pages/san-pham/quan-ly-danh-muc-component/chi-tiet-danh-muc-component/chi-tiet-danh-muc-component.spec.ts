import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChiTietDanhMucComponent } from './chi-tiet-danh-muc-component';

describe('ChiTietDanhMucComponent', () => {
  let component: ChiTietDanhMucComponent;
  let fixture: ComponentFixture<ChiTietDanhMucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiTietDanhMucComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChiTietDanhMucComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
