import { TestBed, inject, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { EngineHttpClient } from './engineHttpClient';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

describe('EngineHttpClient - Mocks', () => {
  test(
    'getModels',
    async(() => {
      const resource = [{ id: 123, title: 'abc' }, { id: 333, title: 'abc' }];
      const httpClient = {
        get: jest.fn().mockImplementation(() => {
          return Observable.of(resource);
        }),
      };
      const service = new EngineHttpClient(httpClient as any);

      expect.assertions(3);
      service.getModels().subscribe(models => {
        const url = httpClient.get.mock.calls[0][0];
        expect(url).toEqual('api/models');
        expect(models).toBeDefined();
        expect(models[0].id).toEqual(123);
      });
    }),
  );
});

describe('EngineHttpClient - TestBed', () => {
  let httpMock: HttpTestingController;
  let engine: EngineHttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EngineHttpClient],
      imports: [HttpClientTestingModule],
    });
  });

  beforeEach(
    inject(
      [EngineHttpClient, HttpTestingController],
      (_engine: EngineHttpClient, _httpMock: HttpTestingController) => {
        httpMock = _httpMock;
        engine = _engine;
      },
    ),
  );

  afterEach(() => {
    httpMock.verify();
  });

  it('should get models', () => {
    // action
    engine.getModels().subscribe(models => {
      expect(models.length).toBe(2);
      expect(models[0]).toEqual('aaaaa');
    });

    // verify
    const req = httpMock.expectOne('api/models');
    expect(req.request.method).toEqual('GET');

    // fulfill the request by transmitting a response.
    req.flush(['aaaaa', 'bbbbb']);
  });
});
