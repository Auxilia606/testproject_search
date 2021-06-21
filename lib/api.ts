import axios from 'axios';

export const getNewsList = ({ q, page, sort, key }) =>
    axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${q}&page=${page}&sort=${sort}&api-key=${key}`,
    );
