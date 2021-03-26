import React from "react";
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    NativeModules,
    Platform,
    Pressable,
    RefreshControl,
    StyleSheet,
    Text,
    View,
} from "react-native";
import requestService from "../http/RequestService";
import Swiper from "react-native-swiper";
import {ColorTheme, TextColorLight, TextColorMain} from "../../resources/Colors";
import CookMenu from "../data/CookMenu";
import {ListRenderItemInfo} from "react-native";
import BannerBean from "../data/BannerBean";
import BaseResponse from "../http/BaseResponse";
import BaseListPageBean from "../http/BaseListPageBean";
import BaseListResponse from "../http/BaseListResponse";
import {array} from "prop-types";

const {StatusBarManager} = NativeModules;

let bannerHeight = Dimensions.get("screen").width * (7 / 18.0);
let screenWidth = Dimensions.get("screen").width;
let itemTextWidth = screenWidth * 0.9 - 10 - 150;
export default class HomePage extends React.Component {

    state = {
        // test1: [],
        // test2: array,
        // test3: Array,
        // test4: Array(),
        // test5: Array(3),
        // test7: Array<CookMenu>(12),
        // test8: new Array<CookMenu>(12),
        // test9: Array < CookMenu >= new Array<CookMenu>(12),
        // test10: Array < CookMenu >= [],
        bannerList: [],
        cookList: [],
        isLoading: false,

    };
    pageNo: number = 1;
    pageSize: number = 10;
    searchKey: string = "";
    flatListHeight = 100;
    itemTextWidth = 100;
    canLoadMore = true;

    constructor() {
        super();
        this.initData();
    }

    initData() {
        //查询轮播
        requestService.queryBanner({
            onSuccess: (result) => {
                this.setState({bannerList: result.data});
            },
            onError: (errCode, msg) => {
                this.setState({bannerList: []});
            },
        });

        this.queryData(this.pageNo, this.pageSize);
        let statusBarHeight = Platform.OS === "ios" ? 20 : StatusBarManager.HEIGHT;
        this.flatListHeight = Dimensions.get("screen").height - 10 - 40 - 10 - bannerHeight - 10 - statusBarHeight - 49;
    }


    render() {
        return <View>
            {/*搜索输入框*/}
            <Text style={styles.input} onPress={() => this.props.navigation.navigate("SearchPage")}>红烧肉</Text>
            {/*轮播图*/}
            <View style={styles.banner_content_view}>
                <Swiper key={this.state.bannerList.size}
                        autoplayTimeout={6}
                        style={styles.wrapper}
                        autoplay={true}
                        loop={true}>
                    {
                        this.state.bannerList.size === 0 ? <View/> : this.initBannerView()
                    }
                </Swiper>
            </View>
            {/*列表*/}


            <FlatList
                keyExtractor={(item, index) => {
                    index.toString();
                }}
                refreshControl={<RefreshControl
                    onRefresh={() => {
                        this.queryData(1, this.pageSize);
                    }}
                    refreshing={this.state.isLoading}/>}

                onEndReachedThreshold={0.01}
                onEndReached={() => {
                    console.log("加载更多--" + this.pageNo + "\n");
                    this.queryData(this.pageNo + 1, this.pageSize);
                }}
                ListFooterComponent={() =>
                    <View style={{alignItems: "center"}}>
                        <ActivityIndicator animating={true} color={ColorTheme} style={{marginTop: 5}}/>
                        <Text style={{marginBottom: 5}}>加载中...</Text>
                    </View>}

                style={{marginTop: 10, marginBottom: 0, height: this.flatListHeight}}
                data={this.state.cookList}
                renderItem={(itemInfo: ListRenderItemInfo<CookMenu>) =>
                    <Pressable onPress={() => {
                        this.props.navigation.navigate("CookMenuDetailPage", {CookMenu: itemInfo.item});
                    }}>

                        <View style={styles.item_cook}>
                            {/*图片*/}
                            <Image style={styles.item_cook_image}
                                   source={{uri: itemInfo.item.coverUrl}}/>
                            {/*分割线*/}
                            <View style={styles.item_line}/>
                            {/*标题*/}
                            <Text style={styles.item_title}
                                  numberOfLines={1}
                                  ellipsizeMode={"tail"}>
                                {itemInfo.item.name}
                            </Text>
                            {/*介绍*/}
                            <Text style={styles.item_content}
                                  numberOfLines={4}
                                  ellipsizeMode={"tail"}>
                                {itemInfo.item.introduce}
                            </Text>
                        </View>
                    </Pressable>
                }/>
        </View>;
    }

    initBannerView() {
        let images = [];
        if (this.state.bannerList instanceof Array) {
            this.state.bannerList.forEach((banner) => {
                images.push(
                    <Image style={styles.banner_image}
                           source={{uri: banner.imgUrl}}/>,
                );
            });
        }
        return images;
    }

    queryData(pageNo, pageSize) {
        //查询默认餐谱列表
        requestService.queryCookList(pageNo, pageSize, {
            onSuccess: (result) => {
                let tempDataList: Array<CookMenu>;
                if (result.data.currentPage === 1) {
                    tempDataList = result.data.dataList;
                } else {
                    tempDataList = this.state.cookList;
                    result.data.dataList.forEach((item) => {
                        tempDataList.push(item);
                    });
                }
                this.pageNo = result.data.currentPage;
                this.setState({cookList: tempDataList, isLoading: false});
            },
            onError: (errCode, msg) => {

            },
        });
    }
}

const styles = StyleSheet.create({
    wrapper: {},
    input: {
        textAlignVertical: "center",
        paddingLeft: 20,
        paddingRight: 20,
        width: "90%",
        height: 40,
        marginTop: 10,
        left: "5%",
        backgroundColor: "#88888833",
        borderRadius: 25,
    },
    banner_content_view: {
        width: "100%",
        height: bannerHeight,
        marginTop: 10,
    },
    banner_image: {
        width: "90%",
        left: "5%",
        height: "100%",
        borderRadius: 15,
    },
    item_cook: {
        flex: 1,
        height: 110,
        marginTop: 10,
        left: "5%",
        width: "90%",
        right: "5%",
    },
    item_cook_image: {
        borderRadius: 10,
        width: 150,
        height: 100,
    },
    item_line: {
        marginTop: 10,
        backgroundColor: "#00000011",
        width: "100%",
        height: 1,
    },

    item_title: {
        position: "absolute",
        color: TextColorMain,
        left: 160,
        fontSize: 18,
        width: itemTextWidth,
        fontWeight: "600",
    },
    item_content: {
        width: itemTextWidth,
        position: "absolute",
        color: TextColorLight,
        height: 70,
        top: 30,
        left: 160,
        fontSize: 14,
        fontWeight: "600",
    },

});