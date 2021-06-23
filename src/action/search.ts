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
    | 'SET_SEARCH_WORD_LIST'
    | 'ADD_SEARCH_WORD'
    | 'REMOVE_SEARCH_WORD'
    | 'SET_CLIP_ITEM'
    | 'ADD_CLIP_ITEM'
    | 'REMOVE_CLIP_ITEM';

/** 뉴욕 타임스 뉴스 검색 API로 데이터를 가져옴
 * @param key 뉴욕 타임스 서버에서 발급하는 사용자 식별 키
 * @param q 검색어
 * @param page 검색페이지
 * @param sort 검색순서 정렬
 */
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

/**
 * 입력한 검색어를 데이터에 설정
 * @param string 검색값
 * @returns type, searchWord
 */
export const setSearchWord = (string: string) => {
    return {
        type: 'SET_SEARCH_WORD' as SearchAction,
        searchWord: string,
    };
};

/**
 * 검색 페이지 변경
 * @param number 검색 페이지
 * @returns type, searchPageNumber
 */
export const setSearchPageNumber = (number: number) => {
    return {
        type: 'SET_SEARCH_PAGE_NUMBER' as SearchAction,
        searchPageNumber: number,
    };
};

/**
 * 이전 검색어 창 표시여부 변경
 * @param searchModalVisible 이전 검색어 창 표시여부 (true = 표시)
 * @returns type, searchModalVisible
 */
export const setSearchModalVisible = (searchModalVisible: boolean) => {
    return {
        type: 'SET_SEARCH_MODAL_VISIBLE' as SearchAction,
        searchModalVisible: searchModalVisible,
    };
};

/**
 * 웹 뷰 표시여부 변경
 * @param webViewModalVisible 웹 뷰 창 표시 여부 (true = 표시)
 * @returns type, webViewModalVisible
 */
export const setWebViewModalVisible = (webViewModalVisible: boolean) => {
    return {
        type: 'SET_WEBVIEW_MODAL_VISIBLE' as SearchAction,
        webViewModalVisible: webViewModalVisible,
    };
};

/**
 * 웹 뷰 주소 변경
 * @param webViewModalURL 웹 뷰 주소 (ex. https:// ...)
 * @returns type, webViewModalURL
 */
export const setWebViewModalURL = (webViewModalURL: string) => {
    return {
        type: 'SET_WEBVIEW_MODAL_URL' as SearchAction,
        webViewModalURL: webViewModalURL,
    };
};

/**
 * 검색어 리스트 설정
 * @param data 검색어리스트 배열
 * @returns type, searchWordList
 */
export const setSearchWordList = data => {
    return {
        type: 'SET_SEARCH_WORD_LIST' as SearchAction,
        searchWordList: data,
    };
};

/**
 * 검색어를 리스트에 추가
 * @param word 검색어
 * @returns type, searchWordItem
 */
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

/**
 * 기존 검색어 삭제
 * @param word 삭제할 검색어
 * @returns type, word
 */
export const removeSearchWord = (word: string) => {
    return {
        type: 'REMOVE_SEARCH_WORD' as SearchAction,
        word,
    };
};

/**
 * 클립 뉴스 리스트 설정 (로컬스토리지 연동)
 * @param data 클립 리스트
 * @returns type, data
 */
export const setClipItem = data => {
    return {
        type: 'SET_CLIP_ITEM' as SearchAction,
        data,
    };
};

/**
 * 클립 뉴스 추가
 * @param id 클립하려는 뉴스 id
 * @returns type, id
 */
export const addClipItem = (id: string) => {
    return {
        type: 'ADD_CLIP_ITEM' as SearchAction,
        id,
    };
};

/**
 * 선택한 클립 뉴스 삭제
 * @param id 삭제하려는 뉴스 id
 * @returns type, id
 */
export const removeClipItem = (id: string) => {
    return {
        type: 'REMOVE_CLIP_ITEM' as SearchAction,
        id,
    };
};
