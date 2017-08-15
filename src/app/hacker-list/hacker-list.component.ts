import { Component, OnInit } from '@angular/core';
import { Hacker } from '../core/hacker.model';
import { HackerService } from '../core/services/hacker.service';

@Component({
  selector: 'app-hacker-list',
  templateUrl: './hacker-list.component.html',
  styleUrls: ['./hacker-list.component.scss']
})
export class HackerListComponent implements OnInit {

  hackers: Array<Hacker>;
  displayedList: Array<Hacker>;

  constructor(private api: HackerService) { }

  ngOnInit() {
    this.api.getHackers()
      .subscribe(data => this.hackers = data, this.handleApiError.bind(this));
  }

  filterData(term: string) {
    const searchTerm = term.toLowerCase();

    this.api.getHackers(term)
      .subscribe(data => this.hackers = data, this.handleApiError.bind(this));
  }

  handleApiError(err) {
    console.log(err);
    this.hackers = []
  }

}
