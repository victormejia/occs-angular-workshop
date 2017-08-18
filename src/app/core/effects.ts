import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { HackerService } from './services/hacker.service';
import * as SearchActions from './actions';

@Injectable()
export class HackerEffects {

  @Effect()
  search$: Observable<Action> = this.actions$.ofType(SearchActions.SEARCH)
    .map((action: SearchActions.Search) => action.payload)
    .switchMap(searchTerm => this.api.getHackers(searchTerm))
    .map(results => new SearchActions.SearchSuccess(results));

  constructor(
    private actions$: Actions,
    private api: HackerService
  ) { }
}
