import { getNewsList } from '../../lib/api';

export interface HTTPRequestParameter {
    key: string;
    q?: string;
    page?: number;
    sort?: sortType;
}

export interface SearchWordItem {
    key: string;
    word: string;
}

export interface NewsItem {
    headline: string;
    pub_date: string;
    web_url: string;
    _id: string;
}

type sortType = 'newest' | 'oldest' | 'relevance';

export type SearchAction =
    | 'SET_SEARCH_WORD'
    | 'GET_NEWS'
    | 'GET_NEWS_SUCCESS'
    | 'GET_NEWS_FAILURE'
    | 'SET_SEARCH_WORD'
    | 'SET_SEARCH_PAGE_NUMBER'
    | 'SET_SEARCH_MODAL_VISIBLE'
    | 'SET_WEBVIEW_MODAL_VISIBLE'
    | 'SET_WEBVIEW_MODAL_URL'
    | 'ADD_SEARCH_WORD';

export const getNews =
    ({ key, q, page = 0, sort = 'newest' }: HTTPRequestParameter) =>
    async dispatch => {
        dispatch({ type: 'GET_NEWS' as SearchAction });
        try {
            const response = await getNewsList({ key, q, page, sort });
            dispatch({
                type: 'GET_NEWS_SUCCESS',
                payload: response.data,
                page: page,
            });
        } catch (e) {
            dispatch({
                type: 'GET_NEWS_FAILURE',
                payload: [],
                page: page,
                error: true,
            });
            throw e;
        }
    };

export const setSearchWord = (string: string) => {
    return {
        type: 'SET_SEARCH_WORD' as SearchAction,
        searchWord: string,
    };
};

export const setSearchPageNumber = (number: number) => {
    return {
        type: 'SET_SEARCH_PAGE_NUMBER' as SearchAction,
        searchPageNumber: number,
    };
};

export const setSearchModalVisible = (searchModalVisible: boolean) => {
    return {
        type: 'SET_SEARCH_MODAL_VISIBLE' as SearchAction,
        searchModalVisible: searchModalVisible,
    };
};

export const setWebViewModalVisible = (webViewModalVisible: boolean) => {
    return {
        type: 'SET_WEBVIEW_MODAL_VISIBLE' as SearchAction,
        webViewModalVisible: webViewModalVisible,
    };
};

export const setWebViewModalURL = (webViewModalURL: string) => {
    return {
        type: 'SET_WEBVIEW_MODAL_URL' as SearchAction,
        webViewModalURL: webViewModalURL,
    };
};

export const addSearchWord = (word: string) => {
    const item = {
        word: word,
        key: new Date().getTime() + word,
    };
    return {
        type: 'ADD_SEARCH_WORD' as SearchAction,
        searchWordItem: item,
    };
};
