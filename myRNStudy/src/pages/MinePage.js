import React from "react";
import { Text } from "react-native";
import RNWaterView from "react-native-waterview";
export default class MinePage extends React.Component {
    static navigationOptions = {
        title: "MinePage",
    };

    render() {
        return <RNWaterView
            url={"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimages.china.cn%2Fattachement%2Fjpg%2Fsite1000%2F20141203%2F7427ea21095115e896281e.jpg&refer=http%3A%2F%2Fimages.china.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1617247279&t=83ddfb2e39003c51e93890971e9e671a"}
            style={{width: 200, height: 200}}/>
    }
}