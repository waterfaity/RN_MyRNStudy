import React from "react";
import {Image, Text} from "react-native";
import MyTool from "../test1/MyTool";
import MyParam from "../test1/MyParam";
import MyData from "../test1/MyData";

export default class MinePage extends React.Component {
    static navigationOptions = {
        title: "MinePage",
    };
    state = {
        myData: MyData
    }
    myTool: MyTool = new MyTool()

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
        return <Text style={{height: 200, top: 500}}>{this.state.myData}</Text>
    }
}