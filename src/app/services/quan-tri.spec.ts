import { TestBed } from '@angular/core/testing';
import { QuanTri } from './quan-tri';

describe('QuanTri', () => {
  let service: QuanTri;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuanTri);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
