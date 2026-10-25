import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThongTinChungComponent } from './thong-tin-chung-component';

describe('ThongTinChungComponent', () => {
  let component: ThongTinChungComponent;
  let fixture: ComponentFixture<ThongTinChungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThongTinChungComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThongTinChungComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
