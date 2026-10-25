import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PhanQuyenAdminComponent } from './phan-quyen-admin-component';

describe('PhanQuyenAdminComponent', () => {
  let component: PhanQuyenAdminComponent;
  let fixture: ComponentFixture<PhanQuyenAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhanQuyenAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PhanQuyenAdminComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
