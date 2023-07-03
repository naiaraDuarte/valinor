import { Component, Input, OnInit } from '@angular/core';
import { Repository } from 'src/app/core/models/Repository.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() repository!: Repository;

  constructor() { }

  ngOnInit(): void {
  }

}
