import { combineReducers } from 'redux';
import searchReducer from './search';

const reducer = combineReducers({ searchReducer });

export default reducer;
