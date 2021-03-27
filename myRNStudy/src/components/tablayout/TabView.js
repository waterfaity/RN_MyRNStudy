import React from 'react';
import Tab from './Tab';
import { Pressable, Text } from 'react-native';

type TabViewProps = {
  tab: Tab,
  minWidth: number
}

export default class TabView extends React.Component<TabViewProps> {

  tabViewWidth;
  static defaultProps = {};

  state = {
    select: false
  };

  setSelect(select: boolean) {
    this.state.select = select;
    this.setState({ select: this.state.select });
  }

  render() {
    return <Pressable
      onLayout={ (event => {

        this.tabViewWidth = event.nativeEvent.layout.width;
        if (this.state.select) {
          this.props.tab.select();
        }
      }) }
      style={ {
        minWidth: this.props.minWidth,
        alignItems: 'center',
        justifyContent: 'center'
      } }
      onPress={ () => {
        this.props.tab.parent.selectTab(this.props.tab);
      } }>
      <Text
        style={ {
          paddingLeft: this.props.tab.parent.props.tabPaddingHor,
          paddingRight: this.props.tab.parent.props.tabPaddingHor,
          //颜色
          color: this.state.select ? this.props.tab.parent.props.selectedColor : this.props.tab.parent.props.normalColor,
          //大小
          fontSize: this.props.tab.parent.tabTextSize
        } }>
        { this.props.tab.text }
      </Text>
    </Pressable>;
  }

}