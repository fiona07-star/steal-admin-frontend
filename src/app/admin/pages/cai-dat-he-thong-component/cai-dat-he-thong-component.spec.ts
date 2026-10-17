import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaiDatHeThongComponent } from './cai-dat-he-thong-component';

describe('CaiDatHeThongComponent', () => {
  let component: CaiDatHeThongComponent;
  let fixture: ComponentFixture<CaiDatHeThongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaiDatHeThongComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CaiDatHeThongComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
