import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MinePage from "./MinePage";
import HomePage from "./HomePage";
import { Image } from "react-native";
import { ColorGrayLight, ColorTheme } from "../../resources/Colors";

const Tab = createBottomTabNavigator();

export default class MainPage extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <Tab.Navigator
            initialRouteName="HomePage"
            tabBarOptions={{
                activeTintColor: ColorTheme,
                inactiveTintColor: ColorGrayLight,
            }}>
            <Tab.Screen
                name="HomePage"
                component={HomePage}
                options={{
                    tabBarBadge: 3,
                    tabBarLabel: "首页",
                    tabBarIcon: ({ color, size }) => {
                        return <Image
                            style={{ width: size, height: size, tintColor: color }}
                            source={require("../../resources/images/ic_home.png")} />;
                    },
                }} />
            <Tab.Screen
                name="MinePage"
                component={MinePage}
                options={{
                    tabBarBadge: 9,
                    tabBarLabel: "我的",
                    tabBarIcon: ({ color, size }) => {
                        return <Image
                            style={{ width: size, height: size, tintColor: color }}
                            source={require("../../resources/images/ic_mine.png")} />;
                    },
                }} />
        </Tab.Navigator>;
    }
}