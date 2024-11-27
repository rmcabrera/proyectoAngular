import { TestBed } from '@angular/core/testing';

import { TaskOptionsService } from './task-options.service';

describe('TaskOptionsService', () => {
  let service: TaskOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
