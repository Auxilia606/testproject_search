import { SearchAction, NewsItem, SearchWordItem } from '../action/search';

export interface SearchState {
    newsList: NewsItem[];
    searchWord: string;
    searchPageNumber: number;
    searchWordList: SearchWordItem[];
    loading: boolean;
    searchModalVisible: boolean;
    webViewModalVisible: boolean;
    webViewModalURL: string;
}

const initialState: SearchState = {
    newsList: [],
    searchWord: '',
    searchPageNumber: 0,
    searchWordList: [],
    loading: false,
    searchModalVisible: false,
    webViewModalVisible: false,
    webViewModalURL: '',
};

const searchReducer = (state = initialState, action) => {
    switch (action.type as SearchAction) {
        case 'GET_NEWS':
            return { ...state, loading: true };
        case 'GET_NEWS_SUCCESS':
            if (action.page) {
                return {
                    ...state,
                    loading: false,
                    newsList: state.newsList.concat(
                        action.payload.response.docs,
                    ),
                };
            } else {
                return {
                    ...state,
                    loading: false,
                    newsList: action.payload.response.docs,
                };
            }
        case 'GET_NEWS_FAILURE':
            return { ...state, loading: false, newsList: action.payload };
        case 'SET_SEARCH_WORD':
            return { ...state, searchWord: action.searchWord };
        case 'SET_SEARCH_PAGE_NUMBER':
            return { ...state, searchPageNumber: action.searchPageNumber };
        case 'SET_SEARCH_MODAL_VISIBLE':
            return { ...state, searchModalVisible: action.searchModalVisible };
        case 'SET_WEBVIEW_MODAL_VISIBLE':
            return {
                ...state,
                webViewModalVisible: action.webViewModalVisible,
            };
        case 'SET_WEBVIEW_MODAL_URL':
            return {
                ...state,
                webViewModalURL: action.webViewModalURL,
            };
        case 'ADD_SEARCH_WORD':
            const searchWordList = state.searchWordList;
            let isSearched = false;
            for (let i = 0; i < searchWordList.length; i += 1) {
                if (searchWordList[i].word === action.searchWordItem.word) {
                    isSearched = true;
                }
            }
            if (!isSearched) {
                searchWordList.unshift(action.searchWordItem);
            }
            return { ...state, searchWordList: searchWordList };
        default:
            return state;
    }
};

export default searchReducer;
