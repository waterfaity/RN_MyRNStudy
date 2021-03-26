import React from "react";
import {Image, Pressable, StyleSheet, Text, View} from "react-native";

import CookMenu from "../data/CookMenu";
import {ColorGray, ColorTheme} from "../../resources/Colors";
import requestService from "../http/RequestService";
import PreparePage from "./detail/PreparePage";
import StepPage from "./detail/StepPage";
import IntroducePage from "./detail/IntroducePage";
import NutritionPage from "./detail/NutritionPage";

let ScrollableTabView = require('react-native-scrollable-tab-view');


/**
 * 菜谱详情
 */
export default class CookMenuDetailRootPage extends React.Component {

    navigationOptions = {
        title: "菜谱详情",
        headerRight: () =>
            <Pressable onPress={() => {
            }}>
                <Text style={styles.action_bar_menu}>烹饪</Text>
            </Pressable>
    };

    state = {
        cookMenu: CookMenu,
    }

    constructor(props) {
        super(props);
        props.navigation.setOptions(this.navigationOptions)
        let cookMenu = props.route.params["CookMenu"]
        this.setState({cookMenu: cookMenu})
        this.queryDetail(cookMenu)
    }

    /**
     * 查询详情
     * @param cookMenu
     */
    queryDetail(cookMenu: CookMenu) {
        let that = this
        requestService.queryCookMenuDetail(cookMenu.id, {
            onSuccess(result) {
                that.state.cookMenu = result.data
                that.state.cookMenu["materialList"] = result.data.materialList
                that.state.cookMenu["seasoningList"] = result.data.seasoningList
                that.state.cookMenu["nutritionList"] = result.data.nutritionList
                that.state.cookMenu["stepList"] = result.data.stepList
                // console.log(JSON.stringify(that.state.cookMenu))
                that.setState({
                    cookMenu: that.state.cookMenu
                })
            },
            onError(errCode, msg) {
                console.log("打印:error" + errCode + " " + msg)
            }
        })
    }


    render() {
        return <View style={{flex: 1}}>
            {/*封面*/}
            <Image
                style={styles.img_cover}
                source={{uri: this.state.cookMenu.coverUrl}}/>
            {/*文本信息展示*/}
            <View style={{position: "absolute"}}>
                <Text style={styles.cook_menu_name}>{this.state.cookMenu.name}</Text>
                <Text style={styles.cook_menu_user_nick_name}>热度: {this.state.cookMenu.readTimes}</Text>
                <Text style={styles.cook_menu_user_nick_name}>标签:{this.state.cookMenu.mark}</Text>
                <Text style={styles.cook_menu_user_nick_name}>创建者:{this.state.cookMenu.userNickName}</Text>
                <Text style={styles.cook_menu_user_nick_name}>创建时间:{this.state.cookMenu.createTime}</Text>
            </View>

            <ScrollableTabView>
                <IntroducePage tabLabel="简介" cookMenu={this.state.cookMenu}/>
                <NutritionPage tabLabel="营养" cookMenu={this.state.cookMenu}/>
                <PreparePage tabLabel="备菜" cookMenu={this.state.cookMenu}/>
                <StepPage tabLabel="步骤" cookMenu={this.state.cookMenu}/>
            </ScrollableTabView>
        </View>;
    }
}

const styles = StyleSheet.create({
    action_bar_menu: {
        color: ColorTheme,
        fontSize: 16,
        paddingLeft: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 15
    },
    img_cover: {
        marginLeft: 15,
        marginTop: 10,
        width: 150,
        height: 100,
    },
    cook_menu_name: {
        marginLeft: 180,
        marginTop: 15,
        fontSize: 18,
        justifyContent: "center",
    },
    cook_menu_user_nick_name: {
        marginLeft: 180,
        fontSize: 14,
        color: ColorGray,
        justifyContent: "center",
    },
});