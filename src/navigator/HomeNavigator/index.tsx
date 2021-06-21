import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SearchScreen from '../../screen/SearchScreen';
import ClipScreen from '../../screen/ClipScreen';

const Tab = createBottomTabNavigator();

const HomeNavigator: React.FunctionComponent = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarOptions={{
                    labelStyle: {
                        fontSize: 20,
                    },
                }}>
                <Tab.Screen name="검색" component={SearchScreen}></Tab.Screen>
                <Tab.Screen
                    name="클립한 뉴스"
                    component={ClipScreen}></Tab.Screen>
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default HomeNavigator;
