import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Paginator } from "src/app/core/models/Paginator.model";
import { Filters } from "src/app/core/models/Filters.model";

@Injectable({
    providedIn: 'root'
  })
  export class RepositoriesService {
  
    private baseUrl = environment.gitHubAPI;
    
    constructor(
        private http: HttpClient
    ) { }

    listRepositories(name: string, filters: Filters): Observable<Paginator> {
        return this.http.get<Paginator>(`${this.baseUrl}?q=${name}?page=${filters.page}&per_page=${filters.size}`);
    }
}