import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestService2 } from './test-2.service';
import { it, expect, describe, beforeEach } from 'vitest';

describe('TestService2', () => {
  let service: TestService2;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestService2]
    });
    service = TestBed.inject(TestService2);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it.each([
    ["case1", 'https://jsonplaceholder.typicode.com/posts'],
    ["case2", 'https://jsonplaceholder.typicode.com/comments']
  ])('%s: should fetch data from API', fakeAsync((_: any, url: any) => {
    let result: any;
    
    service.fetchData().subscribe((res: any) => result = res);
    
    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toBe('GET');
    
    req.flush([{ id: 1, title: "Test Title" }]);
    
    flushMicrotasks();
    
    expect(result).toEqual([{ id: 1, title: "Test Title" }]);
  }));
});
