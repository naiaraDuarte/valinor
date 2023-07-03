import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RepositoriesService } from './repositories.service';
import { Paginator } from 'src/app/core/models/Paginator.model';
import { Filters } from 'src/app/core/models/Filters.model';
import { Repository } from 'src/app/core/models/Repository.model';

describe('RepositoriesService', () => {
  let service: RepositoriesService;
  let httpMock: HttpTestingController;

  const repository: Repository = {
    description: '',
    forks: 0,
    html_url: '', 
    issues_url: '',
    language: '', 
    name: '',
    open_issues: 0,
    owner: {
      avatar_url: '',
      followers_url: '',
      login: '',
      repos_url: '',
    },
    private: false,
    stargazers_count: 0,
    watchers: 0
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RepositoriesService]
    });
    service = TestBed.inject(RepositoriesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve repositories', () => {
    const mockName = 'node';
    const mockFilters: Filters = {
      page: 1,
      size: 10
    };
    const mockResponse: Paginator = {
      total_count: 2,
      items: [
        repository,
        repository
      ],
      incomplete_results: false
    };

    service.listRepositories(mockName, mockFilters).subscribe((response: Paginator) => {
      expect(response.total_count).toEqual(mockResponse.total_count);
      expect(response.items.length).toEqual(mockResponse.items.length);
      expect(response.items[0].name).toEqual(mockResponse.items[0].name);
      expect(response.items[1].name).toEqual(mockResponse.items[1].name);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}?q=${mockName}?page=${mockFilters.page}&per_page=${mockFilters.size}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
