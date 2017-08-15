import { TestBed, inject } from '@angular/core/testing';

import { HackerService } from './hacker.service';

describe('HackerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HackerService]
    });
  });

  it('should be created', inject([HackerService], (service: HackerService) => {
    expect(service).toBeTruthy();
  }));
});
