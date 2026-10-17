import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThanhBenAdminComponent } from './thanh-ben-admin-component';

describe('ThanhBenAdminComponent', () => {
  let component: ThanhBenAdminComponent;
  let fixture: ComponentFixture<ThanhBenAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThanhBenAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThanhBenAdminComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
