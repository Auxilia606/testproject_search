import React from 'react';
import { View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { SearchWordItem } from '../../../action/search';
import Item from './SearchModalItem';

export interface SearchModalProps {
    data?: SearchWordItem[];
    visible?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

const SearchModal: React.FunctionComponent<SearchModalProps> = ({
    data,
    style,
    textStyle,
    visible,
}) => {
    if (visible) {
        return (
            <View style={style}>
                {data.map(item => {
                    return (
                        <Item
                            textStyle={textStyle}
                            key={item.key}
                            word={item.word}
                        />
                    );
                })}
            </View>
        );
    } else {
        return <></>;
    }
};

export default SearchModal;
