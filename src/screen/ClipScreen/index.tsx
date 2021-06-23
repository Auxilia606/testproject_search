import React, { useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'reducer';
import Item from '../../asset/ListItem';

const styles = StyleSheet.create({
    screen: { flex: 1, paddingTop: 40 },
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

const ClipScreen: React.FunctionComponent = () => {
    const { clipList } = useSelector((state: RootState) => ({
        clipList: state.searchReducer.clipList,
    }));

    const itemRenderer = useCallback(({ item }) => {
        return (
            <Item
                title={item.headline.main}
                pub_date={item.pub_date}
                url={item.web_url}
                id={item._id}
                buttonText="Unclip"
            />
        );
    }, []);

    return (
        <View style={styles.screen}>
            <FlatList
                data={clipList}
                keyExtractor={item => item._id}
                renderItem={itemRenderer}
                onEndReachedThreshold={0.05}
            />
        </View>
    );
};

export default ClipScreen;
