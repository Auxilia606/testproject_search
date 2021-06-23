import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from '../../screen/SearchScreen';
import ClipScreen from '../../screen/ClipScreen';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    // 라벨스타일
    label: {
        fontSize: 20,
    },
});

/**
 * 최상위 Navigator. SearchScreen, ClipScreen 으로 구성
 */
const HomeNavigator: React.FunctionComponent = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    labelStyle: styles.label,
                }}>
                <Tab.Screen name="검색" component={SearchScreen} />
                <Tab.Screen name="클립한 뉴스" component={ClipScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default HomeNavigator;
