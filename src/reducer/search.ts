import { SearchAction, NewsItem } from '../action/search';

interface SearchState {
    newsList: NewsItem[];
    loading: boolean;
}

const initialState: SearchState = {
    newsList: [],
    loading: false,
};

const searchReducer = (state = initialState, action) => {
    switch (action.type as SearchAction) {
        case 'GET_NEWS':
            return { ...state, loading: true };
        case 'GET_NEWS_SUCCESS':
            return {
                ...state,
                loading: false,
                newsList: action.payload.response.docs,
            };
        case 'GET_NEWS_FAILURE':
            return { ...state, loading: false, newsList: action.payload };
        default:
            return state;
    }
};

export default searchReducer;
