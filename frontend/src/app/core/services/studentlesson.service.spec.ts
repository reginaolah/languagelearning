import { TestBed } from '@angular/core/testing';

import { StudentlessonService } from './studentlesson.service';

describe('StudentlessonService', () => {
  let service: StudentlessonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentlessonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
