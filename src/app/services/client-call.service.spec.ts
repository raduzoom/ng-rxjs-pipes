import { TestBed } from '@angular/core/testing';

import { ClientCallService } from './client-call.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('ClientCallService', () => {
  let service: ClientCallService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(ClientCallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
