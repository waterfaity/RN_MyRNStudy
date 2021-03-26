import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import CookMenu from "../../data/CookMenu";
import requestService from "../../http/RequestService";
import {ColorGrayLight} from "../../../resources/Colors";
import {set} from "react-native-reanimated";

type Props = {
    cookMenu?: CookMenu
}

export default class PreparePage extends React.Component <Props> {
    state = {
        materialList: [],
        seasoningList: [],
    }

    constructor(props) {
        super(props)
        this.state.materialList = props.cookMenu.materialList
        this.state.seasoningList = props.cookMenu.seasoningList
        this.setState({
            materialList: this.state.materialList,
            seasoningList: this.state.seasoningList
        })
    }


    /**
     *食材/营养
     * @returns {[]}
     */
    initMaterialViews(materialList?: CookMaterialBean[]) {
        let itemViews = []
        materialList?.forEach((cookMaterialBean, index) => {
            itemViews.push(<View style={styles.material_container}>
                <Text style={styles.material}>{cookMaterialBean.name}</Text>
                <Text style={styles.material_phr}>{cookMaterialBean.phr + cookMaterialBean.unit}</Text>
            </View>)
            if (index < materialList.length - 1) {
                itemViews.push(<View style={styles.material_line}/>)
            }
        });
        if (itemViews.length === 0) itemViews.push((<Text>没有数据</Text>))
        return itemViews;
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
    type_title: {
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: ColorGrayLight,
        fontSize: 18,
        justifyContent: "center",
    },
});