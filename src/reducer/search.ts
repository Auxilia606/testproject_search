import { SearchAction, NewsItem, SearchWordItem } from '../action/search';

export interface SearchState {
    newsList: NewsItem[];
    clipList: NewsItem[];
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
    clipList: [],
    searchWord: '',
    searchPageNumber: 0,
    searchWordList: [],
    loading: false,
    searchModalVisible: false,
    webViewModalVisible: false,
    webViewModalURL: '',
};

const searchReducer = (state = initialState, action) => {
    const { searchWordList } = state;
    switch (action.type as SearchAction) {
        case 'GET_NEWS':
            return { ...state, loading: true };
        case 'GET_NEWS_SUCCESS':
            // page 값이 0보다 클 경우에는 기존 newsList에 검색 결과 병합
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
        case 'SET_SEARCH_WORD_LIST':
            return {
                ...state,
                searchWordList: action.searchWordList,
            };
        case 'ADD_SEARCH_WORD':
            // 기존에 검색값이 동일하게 존재하면 추가하지 않음
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
        case 'REMOVE_SEARCH_WORD':
            for (let i = 0; i < searchWordList.length; i += 1) {
                if (searchWordList[i].word === action.word) {
                    searchWordList.splice(i, 1);
                }
            }
            return { ...state, searchWordList };
        case 'SET_CLIP_ITEM':
            return { ...state, clipList: action.data };
        case 'ADD_CLIP_ITEM':
            const id = action.id;
            // 기존 클립한 뉴스가 이미 존재한다면 추가하지 않음
            for (let i = 0; i < state.clipList.length; i += 1) {
                if (state.clipList[i]._id === id) {
                    return state;
                }
            }
            for (let i = 0; i < state.newsList.length; i += 1) {
                if (state.newsList[i]._id === id) {
                    state.clipList.push(state.newsList[i]);
                }
            }
            return state;
        case 'REMOVE_CLIP_ITEM':
            let index: number;
            for (let i = 0; i < state.clipList.length; i += 1) {
                if (state.clipList[i]._id === action.id) {
                    index = i;
                }
            }
            index !== undefined && state.clipList.splice(index, 1);
            return state;
        default:
            return state;
    }
};

export default searchReducer;
