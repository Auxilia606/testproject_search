/**
 * 헤드라인: response.docs[].headline.main
 * 발 행 일: response.docs[].pub_date
 * 기사주소: response.docs[].web_url
 */
import React, { useCallback } from 'react';
import {
    FlatList,
    View,
    Text,
    TextInput,
    StyleSheet,
    NativeSyntheticEvent,
    TextInputEndEditingEventData,
} from 'react-native';
import { connect } from 'react-redux';
import { getNews, NewsItem, HTTPRequestParameter } from '../../action/search';
import Item from './Item';

interface SearchScreenProps {
    newsList: NewsItem[];
    getNews: ({}: HTTPRequestParameter) => void;
}

const styles = StyleSheet.create({
    textInput: { height: 40, margin: 12, borderWidth: 1 },
});

const SearchScreen: React.FunctionComponent<SearchScreenProps> = ({
    newsList,
    getNews,
}) => {
    const onEndEditingHandler: (
        e: NativeSyntheticEvent<TextInputEndEditingEventData>,
    ) => void = useCallback(event => {
        getNews({
            q: event.nativeEvent.text,
            key: 'pjcjEaqrYfiKRvGQlG1vyXDw1DzCMAVe',
        });
    }, []);

    const itemRenderer = useCallback(({ item }) => {
        return (
            <Item title={item.headline.main} pub_date={item.pub_date}></Item>
        );
    }, []);

    return (
        <View>
            <TextInput
                style={styles.textInput}
                onEndEditing={onEndEditingHandler}
            />
            <FlatList data={newsList} renderItem={itemRenderer} />
        </View>
    );
};

const mapStateToProps = state => ({
    newsList: state.searchReducer.newsList,
});

const mapDispatchToProps = dispatch => ({
    getNews: ({ q, key }: HTTPRequestParameter) => {
        dispatch(getNews({ q, key }));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
