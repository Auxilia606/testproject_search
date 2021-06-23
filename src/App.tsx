import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import HomeNavigator from './navigator/HomeNavigator';
import reducer from './reducer';
import { Provider } from 'react-redux';
import { readSearchWordData, readClipData } from './storage/search';
import { setClipItem, setSearchWordList } from './action/search';

const store = createStore(reducer, applyMiddleware(ReduxThunk));

// 앱 실행하고 스토어 구성 이후에 로컬스토리지에서 데이터 추출
// null 데이터는 사용하지 않음
readClipData().then(data => {
    data && store.dispatch(setClipItem(data));
});

readSearchWordData().then(data => {
    data && store.dispatch(setSearchWordList(data));
});

const App = () => {
    return (
        <Provider store={store}>
            <HomeNavigator />
        </Provider>
    );
};

export default App;
