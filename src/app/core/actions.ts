import { Action } from '@ngrx/store';
import { Hacker } from './hacker.model';

export const SEARCH = 'SEARCH_HACKER';
export const SEARCH_SUCCESS = 'SEARCH_HACKER_SUCCESS';

export class Search implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) {}
}

export class SearchSuccess implements Action {
  readonly type = SEARCH_SUCCESS;

  constructor(public payload: Hacker[]) {}
}

export type All = Search | SearchSuccess;
