import { fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestService } from './test.service';

describe('TestService', () => {
  let service: TestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TestService]
    });
    service = TestBed.inject(TestService);
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
