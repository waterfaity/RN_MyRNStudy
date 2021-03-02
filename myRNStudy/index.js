import React, { Component } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginPage from "./src/pages/LoginPage";
import MainPage from "./src/pages/MainPage";
import HomePage from "./src/pages/HomePage";
import SearchPage from "./src/pages/SearchPage";
import CookMenuDetailPage from "./src/pages/CookMenuDetailPage";

const Stack = createStackNavigator();
export default class TestApp extends Component {
    render() {
        console.log(Platform.Version + Platform.select({ android: 12, ios: 23 }));

        return (<NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false, title: "登录页" }} />
                <Stack.Screen name="MinePage" component={LoginPage} options={{ headerShown: false, title: "我的" }} />
                <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false, title: "首页" }} />
                <Stack.Screen name="SearchPage" component={SearchPage} options={{ headerShown: false, title: "搜索" }} />
                <Stack.Screen name="CookMenuDetailPage" component={CookMenuDetailPage}
                              options={{ headerShown: false, title: "菜谱详情" }} />
                <Stack.Screen
                    name="MainPage"
                    component={MainPage}
                    options={{
                        headerShown: false,
                        title: "主页",
                        headerStyle: { backgroundColor: "green" },
                        headerTintColor: "white",
                        headerTitleStyle: { fontWeight: "bold" },
                    }}>
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>);
    }
}

