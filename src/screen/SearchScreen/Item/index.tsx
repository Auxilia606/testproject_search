import React from 'react';
import { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import {
    setWebViewModalURL,
    setWebViewModalVisible,
} from '../../../action/search';

const styles = StyleSheet.create({
    item: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 18,
        marginRight: 18,
    },
    title: { fontSize: 20 },
    dateContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    clipButton: {
        backgroundColor: '#afa',
        marginLeft: 15,
        padding: 3,
        borderWidth: 1,
        borderRadius: 5,
    },
    date: { fontSize: 13 },
});

interface NewsItemProps {
    title: string;
    pub_date: string;
    url: string;
}

const NewsItem: React.FunctionComponent<NewsItemProps> = ({
    title,
    pub_date,
    url,
}) => {
    const pub_date_num = pub_date.match(/\d+/g);
    const date = `${pub_date_num[0]}.${pub_date_num[1]}.${pub_date_num[2]} ${pub_date_num[3]}:${pub_date_num[4]}`;
    const dispatch = useDispatch();
    const setURL = useCallback(
        string => {
            dispatch(setWebViewModalURL(string));
        },
        [dispatch],
    );
    const onSetWebViewModalVisible = useCallback(
        visible => {
            dispatch(setWebViewModalVisible(visible));
        },
        [dispatch],
    );
    return (
        <View style={styles.item}>
            <TouchableOpacity
                onPress={() => {
                    console.log('url', url);
                    setURL(url);
                    onSetWebViewModalVisible(true);
                }}>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>
            <View style={styles.dateContainer}>
                <Text style={styles.date}>{date}</Text>
                <TouchableOpacity>
                    <View style={styles.clipButton}>
                        <Text>Clip</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default React.memo(NewsItem);
