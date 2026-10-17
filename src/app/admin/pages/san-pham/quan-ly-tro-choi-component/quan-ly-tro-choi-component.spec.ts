import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuanLyTroChoiComponent } from './quan-ly-tro-choi-component';

describe('QuanLyTroChoiComponent', () => {
  let component: QuanLyTroChoiComponent;
  let fixture: ComponentFixture<QuanLyTroChoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuanLyTroChoiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuanLyTroChoiComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
