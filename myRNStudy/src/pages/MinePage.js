import React from "react";
import { Text } from "react-native";

export default class MinePage extends React.Component {
    static navigationOptions = {
        title: "MinePage",
    };

    render() {
        return <Text>这是Mine页</Text>;
    }
}