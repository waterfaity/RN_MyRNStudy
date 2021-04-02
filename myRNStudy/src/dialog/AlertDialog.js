import BaseDialog from './BaseDialog';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { AlertDialogProps } from '../index';

class AlertDialog extends React.Component<AlertDialogProps> {

  static defaultProps = {
    title: '提示',
    content: '',
    cancelText: '取消',
    ensureText: '确定'
  };

  constructor(props) {
    super(props);
  }

  render(): React.ReactNode {
    return <BaseDialog  { ...this.props }>
      <View>
        <Text>{ this.props.title }</Text>
        <Text>{ this.props.content }</Text>
        <View style={ { flexDirection: 'row-reverse' } }>
          <Pressable onPress={ () => {
          } }>
            <Text>{ this.props.cancelText }</Text>
          </Pressable>
          <Text>{ this.props.ensureText }</Text>
        </View>
      </View>
    </BaseDialog>;
  }
}

export default AlertDialog;