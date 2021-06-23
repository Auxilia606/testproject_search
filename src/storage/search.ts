import AsyncStorage from '@react-native-community/async-storage';
import { SearchWordItem } from 'action/search';

// 로컬스토리지 접근 API
const read = async key => {
    try {
        const value = await AsyncStorage.getItem(key);
        return JSON.parse(value);
    } catch (error) {
        console.log('storage error: ', error.message);
    }
};

const write = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.log('storage error: ', error.message);
    }
};

// 검색어 리스트 저장
export const readSearchWordData = () => {
    return read('search_word_list');
};

// 검색어 리스트 불러오기
export const writeSearchWordData = (data: SearchWordItem[]) => {
    return write('search_word_list', data);
};

// 클립 뉴스 리스트 저장
export const readClipData = () => {
    return read('clip_data');
};

// 클립 뉴스 리스트 불러오기
export const writeClipData = data => {
    return write('clip_data', data);
};
