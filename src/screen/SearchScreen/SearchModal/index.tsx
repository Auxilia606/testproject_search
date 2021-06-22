import React from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { SearchWordItem } from '../../../action/search';

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
                        <Text style={textStyle} key={item.key}>
                            {item.word}
                        </Text>
                    );
                })}
            </View>
        );
    } else {
        return <></>;
    }
};

export default SearchModal;
