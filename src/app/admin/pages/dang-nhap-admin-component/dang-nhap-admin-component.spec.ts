import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DangNhapAdminComponent } from './dang-nhap-admin-component';

describe('DangNhapAdminComponent', () => {
  let component: DangNhapAdminComponent;
  let fixture: ComponentFixture<DangNhapAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DangNhapAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DangNhapAdminComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
