import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TongQuanAdminComponent } from './tong-quan-admin-component';

describe('TongQuanAdminComponent', () => {
  let component: TongQuanAdminComponent;
  let fixture: ComponentFixture<TongQuanAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TongQuanAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TongQuanAdminComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
