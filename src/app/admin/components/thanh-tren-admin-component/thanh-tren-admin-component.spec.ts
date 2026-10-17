import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThanhTrenAdminComponent } from './thanh-tren-admin-component';

describe('ThanhTrenAdminComponent', () => {
  let component: ThanhTrenAdminComponent;
  let fixture: ComponentFixture<ThanhTrenAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThanhTrenAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThanhTrenAdminComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
