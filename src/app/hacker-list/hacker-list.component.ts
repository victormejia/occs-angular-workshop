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
    this.store.dispatch(new SearchActions.Search(''));
  }

  filterData(term: string) {
    const searchTerm = term.toLowerCase();

    this.store.dispatch(new SearchActions.Search(searchTerm));
  }

  goToDetails(id: string) {
    this.router.navigate([`/hackers/${id}`]);
  }

}
