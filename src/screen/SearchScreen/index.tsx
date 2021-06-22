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
import Item from './Item';
import SearchModal from './SearchModal';
import WebViewModal from './WebViewModal';

const styles = StyleSheet.create({
    screen: { flex: 1 },
    textInput: { height: 40, margin: 12, borderWidth: 1 },
    searchModalView: {
        left: 12,
        right: 12,
        borderWidth: 1,
        backgroundColor: '#fff',
        zIndex: 2,
        padding: 10,
        top: 51,
        position: 'absolute',
        alignItems: 'flex-start',
    },
    searchModalText: {
        fontSize: 14,
    },
});

const SearchScreen: React.FunctionComponent = () => {
    const {
        searchModalVisible,
        searchWord,
        searchPageNumber,
        searchWordList,
        newsList,
        loading,
        webViewModalVisible,
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
            onSetSearchModalVisible(false);
        },
        [onAddSearchWord, onGetNews, onSetSearchModalVisible, onSetSearchWord],
    );

    const itemRenderer = useCallback(({ item }) => {
        return (
            <Item
                title={item.headline.main}
                pub_date={item.pub_date}
                url={item.web_url}
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
                onEndReachedThreshold={0.05}
            />
            <WebViewModal visible={webViewModalVisible} />
        </View>
    );
};

export default SearchScreen;
