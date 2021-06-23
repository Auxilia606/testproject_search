/**
 * 헤드라인: response.docs[].headline.main
 * 발 행 일: response.docs[].pub_date
 * 기사주소: response.docs[].web_url
 */
import React, { useCallback } from 'react';
import {
    FlatList,
    View,
    TextInput,
    StyleSheet,
    NativeSyntheticEvent,
    TextInputEndEditingEventData,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
    getNews,
    setSearchModalVisible,
    addSearchWord,
    HTTPRequestParameter,
    setSearchWord,
    setSearchPageNumber,
} from '../../action/search';
import { RootState } from '../../reducer';
import Item from '../../asset/ListItem';
import SearchModal from './SearchModal';
import WebViewModal from './WebViewModal';
import { writeSearchWordData } from '../../storage/search';

const styles = StyleSheet.create({
    screen: { flex: 1 },
    textInput: { height: 40, margin: 12, marginTop: 40, borderWidth: 1 },
    searchModalView: {
        left: 12,
        right: 12,
        borderWidth: 1,
        backgroundColor: '#fff',
        zIndex: 2,
        padding: 10,
        top: 79,
        position: 'absolute',
        alignItems: 'flex-start',
    },
    searchModalText: {
        fontSize: 14,
    },
});

const SearchScreen: React.FunctionComponent = () => {
    const {
        searchModalVisible, // 검색창 표시 여부
        searchWord, // 검색어
        searchPageNumber, // 검색한 페이지 넘버
        searchWordList, // 검색어 리스트
        newsList, // 검색한 뉴스 리스트
        loading, // 로딩 여부
        webViewModalVisible, // 웹 앱 표시 여부
    } = useSelector((state: RootState) => ({
        searchModalVisible: state.searchReducer.searchModalVisible,
        searchWord: state.searchReducer.searchWord,
        searchPageNumber: state.searchReducer.searchPageNumber,
        searchWordList: state.searchReducer.searchWordList,
        newsList: state.searchReducer.newsList,
        loading: state.searchReducer.loading,
        webViewModalVisible: state.searchReducer.webViewModalVisible,
    }));

    const dispatch = useDispatch();
    const onAddSearchWord = useCallback(
        (string: string) => {
            dispatch(addSearchWord(string));
        },
        [dispatch],
    );

    const onSetSearchModalVisible = useCallback(
        (visible: boolean) => {
            dispatch(setSearchModalVisible(visible));
        },
        [dispatch],
    );

    const onGetNews = useCallback(
        (request: HTTPRequestParameter) => {
            dispatch(getNews(request));
        },
        [dispatch],
    );

    const onSetSearchWord = useCallback(
        (string: string) => {
            dispatch(setSearchWord(string));
        },
        [dispatch],
    );

    const onSetSearchPageNumber = useCallback(
        (number: number) => {
            dispatch(setSearchPageNumber(number));
        },
        [dispatch],
    );

    const onPressInTextInput = useCallback(() => {
        onSetSearchModalVisible(true);
    }, [onSetSearchModalVisible]);

    const onBlurTextInput = useCallback(() => {
        setSearchModalVisible(false);
    }, []);

    const onEndEditingHandler: (
        e: NativeSyntheticEvent<TextInputEndEditingEventData>,
    ) => void = useCallback(
        event => {
            onGetNews({
                q: event.nativeEvent.text,
                key: 'pjcjEaqrYfiKRvGQlG1vyXDw1DzCMAVe',
            });
            onSetSearchWord(event.nativeEvent.text);
            onAddSearchWord(event.nativeEvent.text);
            writeSearchWordData(searchWordList);
            onSetSearchModalVisible(false);
        },
        [
            onAddSearchWord,
            onGetNews,
            onSetSearchModalVisible,
            searchWordList,
            onSetSearchWord,
        ],
    );

    const itemRenderer = useCallback(({ item }) => {
        return (
            <Item
                title={item.headline.main}
                pub_date={item.pub_date}
                url={item.web_url}
                id={item._id}
                buttonText="Clip"
            />
        );
    }, []);

    const onEndReachedHandler = useCallback(() => {
        const nextPageNumber = searchPageNumber + 1;
        onSetSearchPageNumber(nextPageNumber);
        onGetNews({
            q: searchWord,
            page: nextPageNumber,
            key: 'pjcjEaqrYfiKRvGQlG1vyXDw1DzCMAVe',
        });
    }, [onGetNews, onSetSearchPageNumber, searchWord, searchPageNumber]);

    return (
        <View style={styles.screen}>
            <TextInput
                style={styles.textInput}
                onEndEditing={onEndEditingHandler}
                onFocus={onPressInTextInput}
                onBlur={onBlurTextInput}
                defaultValue={searchWord}
            />
            <SearchModal
                style={styles.searchModalView}
                textStyle={styles.searchModalText}
                visible={searchModalVisible}
                data={searchWordList}
            />
            <FlatList
                data={newsList}
                keyExtractor={item => item._id}
                renderItem={itemRenderer}
                refreshing={loading}
                onEndReached={onEndReachedHandler}
                onEndReachedThreshold={0.05} // 화면 끝에 도달하면 재검색
            />
            <WebViewModal visible={webViewModalVisible} />
        </View>
    );
};

export default SearchScreen;
