import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChiTietTroChoiComponent } from './chi-tiet-tro-choi-component';

describe('ChiTietTroChoiComponent', () => {
  let component: ChiTietTroChoiComponent;
  let fixture: ComponentFixture<ChiTietTroChoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChiTietTroChoiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChiTietTroChoiComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
