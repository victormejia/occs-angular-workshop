import { Component, OnInit } from '@angular/core';
import { Hacker } from '../core/hacker.model';
import { HackerService } from '../core/services/hacker.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../core/reducers';
import { Observable } from 'rxjs/Observable';
import * as SearchActions from '../core/actions';

@Component({
  selector: 'app-hacker-list',
  templateUrl: './hacker-list.component.html',
  styleUrls: ['./hacker-list.component.scss']
})
export class HackerListComponent implements OnInit {

  hackers: Observable<Hacker[]>;
  displayedList: Array<Hacker>;

  constructor(
    private api: HackerService,
    private router: Router,
    private store: Store<State>
  ) {
    this.hackers = this.store.select(state => state.search.results);
  }

  ngOnInit() {
    this.api.getHackers()
      .subscribe(data => this.newHackerData(data), this.handleApiError.bind(this));
  }

  filterData(term: string) {
    const searchTerm = term.toLowerCase();

    this.api.getHackers(term)
      .subscribe(data => this.newHackerData(data), this.handleApiError.bind(this));
  }

  handleApiError(err) {
    console.log(err);
    this.newHackerData([]);
  }

  newHackerData = (data: Hacker[]) => {
    this.store.dispatch(new SearchActions.SearchSuccess(data));
  }

  goToDetails(id: string) {
    this.router.navigate([`/hackers/${id}`]);
  }

}
