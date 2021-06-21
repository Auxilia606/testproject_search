import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import HomeNavigator from './navigator/HomeNavigator';
import reducer from './reducer';
import { Provider } from 'react-redux';

const store = createStore(reducer, applyMiddleware(ReduxThunk));

const App = () => {
    return (
        <Provider store={store}>
            <HomeNavigator />
        </Provider>
    );
};

export default App;
