import React, { useCallback } from 'react';
import {
    View,
    Text,
    StyleProp,
    TextStyle,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { removeSearchWord, setSearchWord } from '../../../../action/search';

interface SearchModalItemProps {
    textStyle?: StyleProp<TextStyle>;
    word?: string;
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: 5,
    },
    button: {
        width: 20,
        height: 20,
        borderRadius: 20,
    },
});

const SearchModalItem: React.FunctionComponent<SearchModalItemProps> = ({
    textStyle,
    word,
}) => {
    const dispatch = useDispatch();
    const onRemoveSearchWord = useCallback(() => {
        dispatch(removeSearchWord(word));
    }, [dispatch, word]);
    const onSetSearchWord = useCallback(() => {
        console.log(word);
        dispatch(setSearchWord(word));
    }, [dispatch, word]);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onSetSearchWord}>
                <Text style={textStyle}>{word}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onRemoveSearchWord}>
                <View style={styles.button}>
                    <Text>X</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default React.memo(SearchModalItem);
