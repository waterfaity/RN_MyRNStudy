import React from "react";
import MyTool from "../test1/MyTool";
import MyParam from "../test1/MyParam";
import MyData from "../test1/MyData";
import {TabLayout} from "../components/tablayout/TabLayout";
import {StyleSheet} from "react-native"
import {ColorGray} from "../../resources/Colors";

export default class MinePage extends React.Component {
    static navigationOptions = {
        title: "MinePage",
    };
    state = {
        myData: MyData
    }
    myTool: MyTool = new MyTool()
    tabLayoutRef = React.createRef();

    constructor(props) {
        super(props);
        this.myTool.listener = {
            onGetData: (myData) => {
                console.log("这是myData:" + JSON.stringify(myData))
                this.setState({myData: JSON.stringify(myData.name)})
            }
        }
        // this.myTool.getData(new MyParam())

        this.myTool.request(new MyParam())
            .then((response) => {
                this.myTool.getData(new MyParam())
                // this.setState({myData: JSON.stringify(response.data.name)})
            })
            .catch((result) => {

            })
    }

    render() {
        return <TabLayout
            style={styles.tableLayout}
            onTabSelect={{
                onTabReselected(tab) {
                },
                onTabSelected(tab) {
                },
                onTabUnselected(tab) {
                },
            }}
            ref={(tabLayout) => {
                if (tabLayout != null) {
                    for (let i = 0; i < 10; i++) {
                        let tab = tabLayout.newTab();
                        if (i % 2 === 0)
                            tab.setText("哈哈哈哈")
                        else
                            tab.setText("哈哈")
                        tabLayout.addTab(tab, i, i === 0)
                    }
                }
            }
            }/>
    }
}
const styles = StyleSheet.create({
    tableLayout: {
        height: 40,
    }
})