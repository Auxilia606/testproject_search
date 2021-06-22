import { combineReducers } from 'redux';
import searchReducer, { SearchState } from './search';

const reducer = combineReducers({ searchReducer: searchReducer });

export type RootState = ReturnType<typeof reducer>;

export default reducer;
