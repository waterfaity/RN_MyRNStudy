import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import CookMenu from "../../data/CookMenu";
import requestService from "../../http/RequestService";
import {ColorGrayLight} from "../../../resources/Colors";

type Props = {
    cookMenu?: CookMenu
}

export default class StepPage extends React.Component <Props> {

    constructor(props) {
        super(props)
        this.state = {
            cookMenu: props.cookMenu,
            materialList: [],
            seasoningList: [],
            nutritionList: [],
            stepList: []
        }
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
                {
                    this.getImage(cookStepBean)
                }
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

    getImage(cookStepBean: CookStepBean) {
        return <Image style={styles.cook_step_img} source={{uri: cookStepBean.imgUrl}}/>
    }


    render() {
        return <ScrollView
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
    }

}

const styles = StyleSheet.create({
    introduce_scroll_view: {
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
    back_press: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    }
});