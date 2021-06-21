import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    item: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 18,
        marginRight: 18,
    },
    title: { fontSize: 20 },
    date: { fontSize: 12, alignSelf: 'flex-end' },
});

const NewsItem = ({ title, pub_date }) => {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{pub_date}</Text>
        </View>
    );
};

export default NewsItem;
