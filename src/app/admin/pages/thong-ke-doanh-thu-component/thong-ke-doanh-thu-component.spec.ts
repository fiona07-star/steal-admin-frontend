import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThongKeDoanhThuComponent } from './thong-ke-doanh-thu-component';

describe('ThongKeDoanhThuComponent', () => {
  let component: ThongKeDoanhThuComponent;
  let fixture: ComponentFixture<ThongKeDoanhThuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThongKeDoanhThuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThongKeDoanhThuComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
