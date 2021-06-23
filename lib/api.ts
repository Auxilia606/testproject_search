import axios from 'axios';

/**
 * 뉴욕 타임스 검색 API
 * @param q 검색어
 * @param page 검색 페이지
 * @param sort 검색 정렬 방향
 * @param key 검색 고유 키(사용자별로 다름)
 */
export const getNewsList = ({ q, page, sort, key }) =>
    axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${q}&page=${page}&sort=${sort}&api-key=${key}`,
    );
