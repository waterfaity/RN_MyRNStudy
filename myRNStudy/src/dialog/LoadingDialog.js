import React from "react";
import { Animated, ColorValue, Easing, Modal, Pressable, Text, View } from "react-native";
import isEmpty from "../utils/TextUtils";

/**
 * 属性传递参数
 */

type Props = {
    //是否显示
    visible?: Boolean,
    //背景颜色
    backgroundColor?: ColorValue,
    //是否可以取消
    cancelable?: Boolean,
    //显示文本
    text?: String,
}

/**
 * loading dialog
 */
export default class LoadingDialog extends React.Component<Props> {
    //属性默认值
    static defaultProps = {
        ///是否可以取消
        cancelable: true,
        //是否显示
        visible: false,
        //背景颜色
        backgroundColor: "#00000033",
    };
    //可变量
    state = {
        //dialog 文本
        text: this.props.text,
        //展示dialog
        visible: this.props.visible,
        //背景颜色
        backgroundColor: this.props.backgroundColor,
        //是否可以取消
        cancelable: this.props.cancelable,
        //loading旋转值
        rotateValue: new Animated.Value(0),
    };

    constructor(props) {
        super(props);
    }

    //旋转动画
    rotateAnim = Animated.timing(this.state.rotateValue, {
        //线性差值器
        easing: Easing.linear,
        duration: 1500,
        toValue: 1,
        //原生驱动方式
        useNativeDriver: true,
    });


    /**
     * 展示dialog
     */
    show() {
        this.setState({ visible: true });
        //启动动画
        Animated.loop(this.rotateAnim).start();
    }


    /**
     * 隐藏dialog
     */
    dismiss() {
        //定制动画
        Animated.loop(this.rotateAnim).stop();
        this.setState({ visible: false });
    }

    /**
     * 是否可以取消
     * @param cancelable
     */
    setCancelAble(cancelable: boolean) {
                            this.state.cancelable = cancelable;
    }

    /**
     * 显示文本
     * @param text
     */
    setText(text: String) {
        this.setState({ text: text });
    }

    /**
     * 刷新state
     * @param state
     */
    fresh(state) {
        this.setState(state);
    }


    render() {
        //<Modal> 浮层组件
        return <Modal
            onRequestClose={() => {
                //android tvIos   返回按钮
                if (this.state.cancelable) this.dismiss();
            }}
            //安卓状态栏透明
            statusBarTranslucent={true}
            //背景透明
            transparent={true}
            //显示动画样式
            animationType={"fade"}
            //显示/隐藏
            visible={this.state.visible}>
            {/*触摸消失*/}
            <Pressable onPress={() => {
                if (this.state.cancelable) this.dismiss();
            }}>
                <View
                    style={{
                        height: "100%",
                        //背景阴影
                        backgroundColor: this.state.backgroundColor,
                        //主轴居中 (垂直居中)
                        justifyContent: "center",
                        //另一轴居中 (水平居中)
                        alignItems: "center",
                    }}>
                    <View style={{ backgroundColor: "white", borderRadius: 5, padding: 10 }}>
                        {/*加载icon*/}
                        <Animated.Image
                            style={{
                                width: 40,
                                height: 40,
                                transform: [{
                                    //角度转换 [0, 1] - > ["0deg", "359deg"]
                                    rotate: this.state.rotateValue.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ["0deg", "359deg"],
                                    }),
                                }],
                            }}
                            source={require("../../resources/images/loading.png")}>
                        </Animated.Image>

                        {/*文本显示*/}
                        <Text style={{
                            color: "black",
                            fontSize: 14,
                            //text 为空 不显示文本
                            display: isEmpty(this.state.text) ? "none" : "flex",
                        }}>{this.state.text}</Text>
                    </View>
                </View>
            </Pressable>
        </Modal>;
    }
}
