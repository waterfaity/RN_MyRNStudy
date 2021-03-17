import React from "react";
import {Image, Pressable, ScrollView, StyleSheet, Text, View} from "react-native";

import CookMenu from "../data/CookMenu";
import {ColorGray, ColorGrayLight, ColorTheme} from "../../resources/Colors";
import requestService from "../http/RequestService";


/**
 * 菜谱详情
 */
export default class CookMenuDetailPage extends React.Component {

    navigationOptions = {
        title: "菜谱详情",
        headerRight: () =>
            <Pressable onPress={() => {
            }}>
                <Text style={styles.action_bar_menu}>烹饪</Text>
            </Pressable>
    };


    viewRef = React.createRef();

    constructor(props) {
        super(props);
        props.navigation.setOptions(this.navigationOptions)
        this.state = {
            cookMenu: props.route.params["CookMenu"],
            materialList: [],
            seasoningList: [],
            nutritionList: [],
            stepList: []
        }
        this.queryDetail(this.state.cookMenu)
    }

    /**
     * 查询详情
     * @param cookMenu
     */
    queryDetail(cookMenu: CookMenu) {
        let that = this
        requestService.queryCookMenuDetail(cookMenu.id, {
            onSuccess(result) {
                console.log("打印:" + JSON.stringify(result.data.materialList))
                that.setState({
                    cookMenu: result.data,
                    materialList: result.data.materialList,
                    seasoningList: result.data.seasoningList,
                    nutritionList: result.data.nutritionList,
                    stepList: result.data.stepList
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
                <Text style={styles.cook_menu_user_nick_name}>标签:{this.state.cookMenu.mark}</Text>
                <Text style={styles.cook_menu_user_nick_name}>创建者:{this.state.cookMenu.userNickName}</Text>
                <Text style={styles.cook_menu_user_nick_name}>创建时间:{this.state.cookMenu.createTime}</Text>
            </View>
            {/*介绍*/}
            <ScrollView
                style={styles.introduce_scroll_view}>

                <Text style={styles.type_title}>食材</Text>
                {
                    this.initMaterialViews(this.state.materialList)
                }

                <Text style={styles.type_title}>佐料</Text>
                {
                    this.initMaterialViews(this.state.seasoningList)
                }

                <Text style={styles.type_title}>营养价值</Text>
                {
                    this.initMaterialViews(this.state.nutritionList)
                }

                <Text style={styles.type_title}>步骤</Text>
                {
                    this.initCookStopViews()
                }


                <Text style={styles.type_title}>简介</Text>
                <Text style={styles.introduce_content}>{this.state.cookMenu.introduce}</Text>
            </ScrollView>
        </View>;
    }

    /**
     *
     * @returns {[]}
     */
    initMaterialViews(materialList: CookMaterialBean[]) {
        let itemViews = []
        materialList.forEach((cookMaterialBean, index) => {
            itemViews.push(<View style={styles.material_container}>
                <Text style={styles.material}>{cookMaterialBean.name}</Text>
                <Text style={styles.material_phr}>{cookMaterialBean.phr + cookMaterialBean.unit}</Text>
            </View>)
            if (index < materialList.length - 1) {
                itemViews.push(<View style={styles.material_line}/>)
            }
        });
        return itemViews;
    }

    /**
     * 步骤
     * @returns {[]}
     */
    initCookStopViews() {
        let itemViews = []
        this.state.stepList.forEach((cookStepBean: CookStepBean, index) => {
            itemViews.push(<View style={styles.cook_step_container}>
                <Image style={styles.cook_step_img} source={{uri: cookStepBean.imgUrl}}/>
                <View style={styles.cook_step_info_container}>
                    <Text style={styles.cook_step_title}>步骤{(index + 1) + ":" + cookStepBean.title}</Text>
                    <Text>时间: {cookStepBean.duration}分钟</Text>
                    <Text>锅具: {cookStepBean.potName}</Text>
                    <Text>温度: {cookStepBean.temperature}</Text>
                </View>
                <Text style={styles.cook_step_introduce}>简介:{cookStepBean.introduce}</Text>

            </View>)
        });
        return itemViews;
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
    introduce_scroll_view: {
        marginTop: 10,
        flex: 1,
    },
    material_container: {
        paddingBottom: 5,
        paddingTop: 5,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    material: {
        fontSize: 16,
        marginLeft: 15,
    },
    material_phr: {
        marginRight: 15,
        fontSize: 16,
        marginLeft: 15,
    },
    material_line: {
        marginRight: 15,
        marginLeft: 15,
        height: 1,
        backgroundColor: ColorGrayLight
    },
    cook_step_container: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: "#dddddd"
    },
    cook_step_img: {
        borderRadius: 10,
        width: 150,
        height: 100,
    },
    cook_step_title: {
        fontSize: 16,
        marginTop: 10,
    },
    cook_step_introduce: {
        fontSize: 14,
        margin: 8,
    },
    cook_step_info_container: {
        position: "absolute",
        marginLeft: 160,
    },
    type_title: {
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: ColorGrayLight,
        fontSize: 18,
        justifyContent: "center",
    },
    introduce: {
        marginLeft: 15,
        marginTop: 10,
        fontSize: 18,
        justifyContent: "center",
    },
    introduce_content: {
        marginLeft: 15,
        marginTop: 10,
        marginRight: 15,
        fontSize: 16,
        justifyContent: "center",
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
    back_press: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    img_cover: {
        marginLeft: 15,
        marginTop: 10,
        width: 150,
        height: 100,
    },
});