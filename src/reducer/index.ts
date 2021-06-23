import { combineReducers } from 'redux';
import searchReducer from './search';

// 추후 확장성을 위해 미리 combineReducer 로 구현
const reducer = combineReducers({ searchReducer });

export type RootState = ReturnType<typeof reducer>;

export default reducer;
