import React, { useState } from 'react';
import { Modal, View, Image, Text } from 'react-native';
import isEmpty from '../utils/TextUtils';
export default class LoadingDialog extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            //dialog 文本
            text: props.text,
            //展示文本
            textDislay: isEmpty(props.text) ? "none" : "flex",
            //展示dialog
            visible: props.visible
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            text: nextProps.text,
            textDislay: isEmpty(nextProps.text) ? "none" : "flex",
            visible: nextProps.visible
        })
    }

    showText() {
        this.setState((text) => { return { text: text } })
        this.setTextDisplay()
    }

    setTextDisplay = () => {
        this.state.textDislay = isEmpty(this.state.text) ? "none" : "flex"
        this.setState(() => { return {} })
    }

    render() {
        return <Modal
            transparent={true}
            onRequestClose={() => { }}
            visible={this.state.visible}>
            <View
                style={{
                    height: '100%',
                    borderRadius: 5,
                    backgroundColor: '#00000033',
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <View style={{ backgroundColor: 'white', borderRadius: 5, padding: 10 }}>
                    <Image
                        style={{ width: 40, height: 40 }}
                        source={require("../../resources/images/loading.png")} />
                    <Text style={{ color: "black", fontSize: 14, display: this.state.textDislay }}>{this.state.text}</Text>
                </View>
            </View>
        </Modal>
    }
}