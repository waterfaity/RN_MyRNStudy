import React from "react";
import { Text } from "react-native";

export default class HomePage extends React.Component {


    constructor(props) {
        super(props);
        props.navigation.setOptions({
            title: "哈哈",
            headerRight: () => (
                <Text style={{
                    color: "white",
                    width: 50,
                    height: 50,
                    textAlign: "center",
                    textAlignVertical: "center",
                }}>菜单</Text>),
            headerLeft: () => (
                <Text style={{
                    color: "white",
                    width: 50,
                    height: 50,
                    textAlign: "center",
                    textAlignVertical: "center",
                }}>返回</Text>),
        });
        const extras = props.route.params;
        console.log("homePage: userModule:" + extras.userModule);
    }

    render() {
        return <Text>这是home页</Text>;
    }
}