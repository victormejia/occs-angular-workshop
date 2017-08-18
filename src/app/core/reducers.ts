import { Hacker } from './hacker.model';
import * as SearchActions from './actions';

export interface SearchState {
  searchTerm: string;
  results: Hacker[];
}

const initialState: SearchState = {
  searchTerm: '',
  results: []
};

export function search(state = initialState, action: SearchActions.All): SearchState {
  switch (action.type) {
    case SearchActions.SEARCH: {
      return {
        ...state,
        searchTerm: action.payload
      };
    }

    case SearchActions.SEARCH_SUCCESS: {
      return {
        ...state,
        results: action.payload
      };
    }

    default: {
      return state;
    }

  }
}

/**
 * App reducers and state
 */
export const reducers = {
  search
};

export interface State {
  search: SearchState;
}
