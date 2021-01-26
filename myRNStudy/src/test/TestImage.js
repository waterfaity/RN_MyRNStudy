import React from "react";
import { View, Image, Button } from 'react-native';

export default class TestImage extends React.Component {

  constructor() {
    super();
    this.state = { size: 150 };
  }

  render() {
    return <View style={ { top: 100, borderRadius: 12} }>
      <Button title="放大" onPress={ () => {
        this.setState({ size: this.state.size + 10 });
      } }/>
      <Button title="缩小" onPress={ () => {
        this.setState({ size: this.state.size - 10 });
      } }/>
      <Image style={ { width: this.state.size, height: this.state.size, borderRadius: 20 } }
             blurRadius={ 1 }
             source={ require("../../resources/images/dog.png") }/>
    </View>;
  }
}
