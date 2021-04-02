import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import CookMenu from '../../data/CookMenu';
import { ColorGrayLight } from '../../../resources/Colors';

type Props = {
  cookMenu?: CookMenu
}

export default class IntroducePage extends React.Component <Props> {

  constructor(props) {
    super(props);
  }


  render() {
    return <ScrollView
      style={ styles.introduce_scroll_view }>
      <Text style={ styles.introduce_content }>{ this.props.cookMenu.introduce }</Text>
    </ScrollView>;
  }
}

const styles = StyleSheet.create({
  introduce_scroll_view: {
    flex: 1
  },
  type_title: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: ColorGrayLight,
    fontSize: 18,
    justifyContent: 'center'
  },
  introduce_content: {
    marginLeft: 15,
    marginTop: 10,
    marginRight: 15,
    fontSize: 16,
    justifyContent: 'center'
  }
});