import { getNewsList } from '../../lib/api';

export interface HTTPRequestParameter {
    key: string;
    q?: string;
    page?: number;
    sort?: sortType;
}

export interface NewsItem {
    headline: string;
    pub_date: string;
    web_url: string;
}

type sortType = 'newest' | 'oldest' | 'relevance';

export type SearchAction =
    | 'SET_SEARCH_WORD'
    | 'GET_NEWS'
    | 'GET_NEWS_SUCCESS'
    | 'GET_NEWS_FAILURE';

export const getNews =
    ({ key, q, page = 0, sort = 'newest' }: HTTPRequestParameter) =>
    async dispatch => {
        dispatch({ type: 'GET_NEWS' as SearchAction });
        try {
            const response = await getNewsList({ key, q, page, sort });
            dispatch({
                type: 'GET_NEWS_SUCCESS',
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: 'GET_NEWS_FAILURE',
                payload: [],
                error: true,
            });
            throw e;
        }
    };
