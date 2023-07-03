import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepositoriesRoutingModule } from './repositories-routing.module';
import { RepositoriesComponent } from './repositories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TruncateDirective } from 'src/app/shared/directives/truncate-text.directive';
import { SearchNotFoundComponent } from './components/search-not-found/search-not-found.component';
import { ListComponent } from './components/list/list.component';

const materialComponents = [
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatPaginatorModule
];

@NgModule({
  declarations: [
    RepositoriesComponent,
    TruncateDirective,
    SearchNotFoundComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RepositoriesRoutingModule,
    ...materialComponents
  ],
  providers: [],
})
export class RepositoriesModule { }
