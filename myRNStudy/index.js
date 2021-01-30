import React, { Component } from "react";
import { Image, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginPage from "./src/pages/LoginPage";
import HomePage from "./src/pages/HomePage";
import MinePage from "./src/pages/MinePage";

const Stack = createStackNavigator();

function LogoTitle() {
    return (
        <Image
            style={{ width: 50, height: 50 }}
            source={require("./resources/images/dog.png")}
        />
    );
}

export default class TestApp extends Component {
    render() {
        console.log(Platform.Version + Platform.select({ android: 12, ios: 23 }));

        return (<NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LoginPage" component={LoginPage} options={{ headerShown: false, title: "登录页" }} />
                <Stack.Screen
                    name="HomePage"
                    component={HomePage}
                    options={{
                        headerShown: false,
                        header: undefined,
                        title: "主页",
                        headerStyle: { backgroundColor: "green" },
                        headerTintColor: "white",
                        headerTitleStyle: { fontWeight: "bold" },
                        //headerTitle: props => <LogoTitle {...props} />,
                    }} />
                <Stack.Screen name="MinePage" component={MinePage} />
            </Stack.Navigator>
        </NavigationContainer>);
    }
}

