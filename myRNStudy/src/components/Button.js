import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import type { ButtonProps } from './index';
import { ColorWhite, TextColorMain } from '../../resources/Colors';

export default class Button extends Component<ButtonProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return <TouchableOpacity
      { ...this.props }
      style={ [
        { justifyContent: 'center', minHeight: 50, minWidth: 100, paddingLeft: 10, paddingRight: 10, alignItems: 'center', backgroundColor: ColorWhite, borderRadius: 10 },
        this.props.style
      ] }>
      <Text
        { ...this.props.textProps }
        style={ [
          { color: TextColorMain, fontSize: 16 },
          this.props.textProps.style
        ] }>
        { this.props.textProps.value }
      </Text>
    </TouchableOpacity>;
  }
}
