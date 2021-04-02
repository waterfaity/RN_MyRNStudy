import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AlertDialog from '../dialog/AlertDialog';
import InputDialog from '../dialog/InputDialog';

export default class MinePage extends React.Component {
  static navigationOptions = {
    title: 'MinePage'
  };
  state = { visible: true };

  constructor(props) {
    super(props);

  }

  render() {
    return <View>
      <Pressable onPress={ () => {
        this.setState({ visible: true, message: '你好呀' + new Date().getTime() });
      } }>
        <Text>abc</Text>
      </Pressable>
      <InputDialog
        inputProps={ { placeholder: '请输入内容(限100字)', maxLength: 100 } }
        onClick={ (dialog, which) => {
          if (which === 'BUTTON_NEGATIVE') {
            this.setState({ visible: false });
          } else if (which === 'BUTTON_POSITIVE') {
            this.setState({ visible: false });
          }
        } }
        onDismiss={ () => {
          this.setState({ visible: false });
        } }
        title={ '请输入评论' }
        positiveText={ '评论' }
        negationText={ '取消' }
        visible={ this.state.visible }/>
      {/*<StatusBar animated={} />*/ }
    </View>;
  }
}
const styles = StyleSheet.create({
  tableLayout: {
    height: 50
  }
});