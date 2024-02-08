import { TestBed } from '@angular/core/testing';

import { RequestMiddlewareService } from './request-middleware.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('request-middleware.service', () => {
  let service: RequestMiddlewareService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RequestMiddlewareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
