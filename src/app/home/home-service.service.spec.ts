import { Nation } from './../model/nation';
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeServiceService } from './home-service.service';

describe('HomeServiceService', () => {
  let homeServiceService: HomeServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        homeServiceService
      ],
    });

    homeServiceService = TestBed.get(HomeServiceService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it(`should fetch nations as an Observable`, async(inject([HttpTestingController, HomeServiceService],
    (httpClient: HttpTestingController, homeServiceService: HomeServiceService) => {

      let nations: Array<Nation> = []

      homeServiceService.getData()
        .subscribe((nations: Array<Nation>) => {
          expect(nations.length).toBe(250);
        });

      let req = httpMock.expectOne('assets/data.json');
      expect(req.request.method).toBe("GET");

      req.flush(nations);
      httpMock.verify();

    })));
});
