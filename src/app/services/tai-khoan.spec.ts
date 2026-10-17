import { TestBed } from '@angular/core/testing';
import { TaiKhoan } from './tai-khoan';

describe('TaiKhoan', () => {
  let service: TaiKhoan;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaiKhoan);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
