import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      containerStyle: {

        backgroundColor: props.style.backgroundColor == null ? "white" : props.style.backgroundColor,
        borderRadius: props.style.borderRadius == null ? 10 : props.style.borderRadius,

        width: props.style.width == null ? 80 : props.style.width,
        height: props.style.height == null ? 40 : props.style.height,

        paddingHoriontal: props.style.paddingHoriontal ? 20 : props.style.paddingHoriontal,
        paddingVertical: props.style.paddingVertical ? 10 : props.style.paddingVertical,

        marginLeft: props.style.marginLeft == null ? 0 : props.style.marginLeft,
        marginTop: props.style.marginTop == null ? 0 : props.style.marginTop,
        marginRight: props.style.marginRight == null ? 0 : props.style.marginRight,
        marginBottom: props.style.marginBottom == null ? 0 : props.style.marginBottom,

        alignItems: props.style.alignItems == null ? "center" : props.style.alignItems,
        justifyContent: props.style.justifyContent == null ? "center" : props.style.justifyContent,

      },
      fontStyle: {
        fontSize: props.style.fontSize == null ? 15 : props.style.fontSize,
        fontStyle: props.style.fontStyle == null ? null : props.style.fontStyle,
        fontWeight: props.style.fontWeight == null ? null : props.style.fontWeight,
        color: props.style.color == null ? "black" : props.style.color,
      },
    };
  }

  render() {
    return <TouchableOpacity
      style={this.state.containerStyle}
      onPress={this.props.onPress}
      onPressIn={this.props.onPressIn}
      onPressOut={this.props.onPressOut}
      onLongPress={this.props.onLongPress}
      activeOpacity={this.props.activeOpacity}
      delayLongPress={this.props.delayLongPress}>
      <Text style={this.state.fontStyle}>{this.props.title}</Text>
    </TouchableOpacity>;
  }
}
