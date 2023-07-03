import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-not-found',
  templateUrl: './search-not-found.component.html',
  styleUrls: ['./search-not-found.component.scss']
})
export class SearchNotFoundComponent implements OnInit {

  @Input() errorSearch = false;

  constructor() { }

  ngOnInit(): void {
  }

}
