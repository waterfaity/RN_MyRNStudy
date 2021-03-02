import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import {Canvas} from "react-native-canvas"
/**
 * 菜谱详情
 */
export default class CookMenuDetailPage extends React.Component {

    cookMenu;
    viewRef = React.createRef();

    constructor(props) {
        super(props);
        debugger
        this.cookMenu = props.route.params["CookMenu"];

    }

    render() {
        return <View>


            <Pressable
                style={styles.back_press}
                onPress={() => {
                    this.props.navigation.pop();
                }}>
                <Image style={styles.back} source={require("../../resources/images/ic_back.png")} />
            </Pressable>
            <Image
                style={styles.img_cover}
                source={{ uri: this.cookMenu.coverUrl }} />
            <Text>{this.cookMenu.name}</Text>
        </View>;
    }
}
const styles = StyleSheet.create({
    back_press: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    back: {
        position: "absolute",
        padding: 15,
        width: 10,
        height: 10,
    },
    img_cover: {
        top: 100,
        position: "absolute",
        width: 150,
        height: 100,
    },
});