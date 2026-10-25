import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChinhSachComponent } from './chinh-sach-component';

describe('ChinhSachComponent', () => {
  let component: ChinhSachComponent;
  let fixture: ComponentFixture<ChinhSachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChinhSachComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChinhSachComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
