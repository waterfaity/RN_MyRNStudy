import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { ColorGrayLight } from "../../resources/Colors";
import Swiper from "react-native-swiper";
import RequestService from "../http/RequestService";

export default class HomePage extends React.Component {
    state = {
        bannerList: null,
    };

    constructor() {
        super();
        this.initData();
    }

    initData() {
        RequestService().queryBanner({
            onSuccess: (data) => {
            },
        });
    }


    render() {
        return <View>
            <TextInput style={styles.input} />
            <Swiper>

            </Swiper>
        </View>;
    }
}

const styles = StyleSheet.create({
    input: {
        width: "90%",
        height: 40,
        top: 10,
        left: "5%",
        bottom: 10,
        backgroundColor: ColorGrayLight,
        borderRadius: 25,
    },
});