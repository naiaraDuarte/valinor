import { TestBed, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { RepositoriesComponent } from './repositories.component';
import { RepositoriesService } from './services/repositories.service';
import { Paginator } from 'src/app/core/models/Paginator.model';
import { Filters } from 'src/app/core/models/Filters.model';
import { Repository } from 'src/app/core/models/Repository.model';

describe('RepositoriesComponent', () => {
  let component: RepositoriesComponent;
  let fixture: ComponentFixture<RepositoriesComponent>;
  let repositoriesService: RepositoriesService;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [RepositoriesComponent],
      providers: [RepositoriesService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoriesComponent);
    component = fixture.componentInstance;
    repositoriesService = TestBed.inject(RepositoriesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.searchForm.get('name')).toBeTruthy();
  });

  it('should call getRepositories on field value change', fakeAsync(() => {
    const repoName = 'node';
    const mockPaginator: Paginator = {
      incomplete_results: false,
      items: [],
      total_count: 20
    };
    const mockFilters: Filters = {
      page: 0,
      size: 10
    }
    spyOn(component as never, 'getRepositories').and.callThrough();
    spyOn(repositoriesService, 'listRepositories').and.returnValue(of(mockPaginator));
    const nameInput = component.searchForm.get('name') as FormControl;
    nameInput.setValue(repoName);
    tick(500);
    expect(component['getRepositories']).toHaveBeenCalled();
    expect(repositoriesService.listRepositories).toHaveBeenCalledWith(repoName, mockFilters);
    expect(component.repositories).toEqual(mockPaginator.items);
    expect(component.totalResults).toBe(mockPaginator.total_count);
  }));

  it('should call getRepositories on page change', () => {
    const pageIndex = 1;
    const pageSize = 10;
    spyOn(component as never, 'getRepositories');
    component.onPageChange({ pageIndex, pageSize });
    expect(component['getRepositories']).toHaveBeenCalledWith(pageIndex, pageSize);
  });

  it('should reset the form and clear repositories on clear', () => {
    component.searchForm.get('name')?.setValue('example-repository');
    component.repositories = [repository];
    component.clear();
    expect(component.searchForm.get('name')?.value).toBe(null);
    expect(component.repositories).toEqual([]);
  });
});