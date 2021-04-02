import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import AlertDialog from '../dialog/AlertDialog';

export default class MinePage extends React.Component {
  static navigationOptions = {
    title: 'MinePage'
  };
  state = { visible: false };

  constructor(props) {
    super(props);

  }

  render() {
    return <View>
      <Pressable onPress={ () => {
        this.setState({ visible: true, content: '你好呀' + new Date().getTime() });
      } }>
        <Text>abc</Text>
      </Pressable>
      <AlertDialog
        onDismiss={ () => {
          this.setState({ visible: false });
        } }
        title={ '提示' }
        content={ this.state.content }
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