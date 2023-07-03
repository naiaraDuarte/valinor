import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { Repository } from 'src/app/core/models/Repository.model';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  const repo: Repository = {
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
      declarations: [ListComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const repository: Repository = repo;
    component.repository = repository;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set repository input', () => {
    const repository: Repository = repo;
    component.repository = repository;
    expect(component.repository).toEqual(repository);
  });
});
