import React from "react";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";

import {Canvas} from "react-native-canvas"
import CookMenu from "../data/CookMenu";

/**
 * 菜谱详情
 */
export default class CookMenuDetailPage extends React.Component {

    cookMenu: CookMenu;
    viewRef = React.createRef();

    constructor(props) {
        super(props);
        debugger
        this.cookMenu = props.route.params["CookMenu"];
    }

    render() {
        return <View>
            <Image
                style={styles.img_cover}
                source={{uri: this.cookMenu.coverUrl}}/>
            <Text style={styles.cook_menu_name}>{this.cookMenu.name}</Text>
            <Text style={styles.cook_menu_name}>{this.cookMenu.name}</Text>
        </View>;
    }
}
const styles = StyleSheet.create({
    cook_menu_name: {
        marginLeft: 170,
        top: 15,
        fontSize:18,
        justifyContent: "center",
    },
    back_press: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    img_cover: {
        marginTop: 10,
        position: "absolute",
        width: 150,
        height: 100,
    },
});