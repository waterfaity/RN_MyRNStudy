import React from "react";
import { Animated, Easing, Modal, Pressable, Text, View } from "react-native";
import isEmpty from "../utils/TextUtils";


export type propTypes = {
  visible?: Boolean,
  cancelable?: Boolean,
  text?: String,
};

export default class LoadingDialog extends React.Component {

  state = {
    //dialog 文本
    text: this.props.text,
    //展示dialog
    visible: this.props.visible,
    //是否可以取消
    cancelable: this.props.cancelable,
    //loading旋转值
    rotateValue: new Animated.Value(0),
  };

  //旋转动画
  rotateAnim = Animated.timing(this.state.rotateValue, {
    easing: Easing.linear,
    duration: 1500,
    toValue: 1,
    useNativeDriver: true,
  });

  constructor(props) {
    super(props);
  }

  /**
   * 展示dialog
   */
  show() {
    //动画展示
    this.setState({ visible: true });
    Animated.loop(this.rotateAnim).start();
  }

  /**
   * 显示文本
   * @param text
   */
  setText(text: String) {
    this.setState({ text: text });
  }

  /**
   * 隐藏dialog
   */
  dismiss() {
    Animated.loop(this.rotateAnim).stop();
    this.setState({ visible: false });
  }


  render() {
    return <Modal
      transparent={true}
      onRequestClose={() => {
      }}
      visible={this.state.visible}>
      <Pressable
        onPress={() => {
          if (this.state.cancelable) this.dismiss();
        }}>
        <View
          style={{
            height: "100%",
            borderRadius: 5,
            backgroundColor: "#00000033",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <View style={{ backgroundColor: "white", borderRadius: 5, padding: 10 }}>
            <Animated.Image
              style={{
                width: 40,
                height: 40,
                transform: [{
                  rotate: this.state.rotateValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "359deg"],
                  }),
                }],
              }}
              source={require("../../resources/images/loading.png")}>
            </Animated.Image>

            <Text style={{
              color: "black",
              fontSize: 14,
              display: isEmpty(this.state.text) ? "none" : "flex",
            }}>{this.state.text}</Text>
          </View>
        </View>
      </Pressable>

    </Modal>;
  }
}
