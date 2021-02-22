import React from "react";
import { Dimensions, Image, StyleSheet, TextInput, View } from "react-native";
import { ColorGrayLight } from "../../resources/Colors";
import requestService from "../http/RequestService";
import Swiper from "react-native-swiper";

export default class HomePage extends React.Component {

    state = {
        bannerList: null,
    };

    constructor() {
        super();
        this.initData();
    }

    initData() {
        requestService.queryBanner({
            onSuccess: (result) => {
                this.setState({ bannerList: result.data });
            },
            onError: (errCode, msg) => {
            },
        });
    }


    render() {
        return <View>
            <TextInput style={styles.input} />
            <View style={styles.banner_content_view}>
                <Swiper style={{}} >
                    {
                        this.state.bannerList === null ? <View /> : this.initBannerView()
                    }
                </Swiper>
            </View>
        </View>;
    }

    initBannerView() {
        let images = [];
        this.state.bannerList.forEach((banner) => {
            images.push(
                <Image style={styles.banner_image}
                       source={{ uri: banner.imgUrl }} />,
            );
        });
        return images;
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
    banner_content_view: {
        width: "100%",
        height: Dimensions.get("screen").width * (7 / 18.0),
        top: 20,
    },
    banner_image: {
        width: "90%",
        left: "5%",
        height: "100%",
        borderRadius: 15,
    },
});