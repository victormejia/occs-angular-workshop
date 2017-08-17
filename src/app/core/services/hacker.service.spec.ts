import { HackerService } from './hacker.service';
import { mockHackers } from '../helpers.spec';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

fdescribe('HackerService', () => {
  let service: HackerService;
  const httpSpy = jasmine.createSpyObj('http', ['get']);

  beforeEach(() => {
    service = new HackerService(httpSpy);
  });

  describe('getHackers', () => {

    it('should return list of hackers', (done) => {
      const mockResponse = Observable.of(mockHackers);

      httpSpy.get.and.returnValue(mockResponse);

      service.getHackers()
        .subscribe(data => {
          expect(httpSpy.get).toHaveBeenCalledWith('/api/hackers?q=');
          expect(data).toEqual(mockHackers);
          done();
        });
    });

    it('should return list of hackers when called with search term', (done) => {
      const mockResponse = Observable.of(mockHackers);

      httpSpy.get.and.returnValue(mockResponse);

      service.getHackers('Ig')
        .subscribe(data => {
          expect(httpSpy.get).toHaveBeenCalledWith('/api/hackers?q=Ig');
          expect(data).toEqual(mockHackers);
          done();
        });
    });
  });

});
