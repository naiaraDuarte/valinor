import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { RepositoriesService } from './services/repositories.service';
import { Repository } from 'src/app/core/models/Repository.model';
import { Paginator } from 'src/app/core/models/Paginator.model';
import { Filters } from 'src/app/core/models/Filters.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit, OnDestroy {
  totalResults = 0;
  repositories: Repository[] = [];
  searchForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  private subscription = new Subscription();

  get nameInput() {
    return this.searchForm.get('name');
  }

  constructor(private repositoriesService: RepositoriesService) { }

  ngOnInit(): void {
    this.fieldWatcher();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private fieldWatcher(): void {
    this.subscription.add(
      this.nameInput?.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
        if(!value) this.clear();
        else this.getRepositories();
      })
    )
  }

  private getRepositories(page: number = 0, size: number = 10): void {
    if (this.searchForm.invalid) return;

    const filter: Filters = {
      page,
      size
    };

    this.subscription.add(
      this.repositoriesService.listRepositories(this.nameInput?.value, filter).subscribe((res: Paginator) => {
        this.totalResults = res.total_count;
        this.repositories = res.items;
      })
    )
  }

  onPageChange(event: any): void {
    this.getRepositories(event.pageIndex, event.pageSize);
  }

  clear(): void {
    this.searchForm.reset();
    this.repositories = [];
  }
}
