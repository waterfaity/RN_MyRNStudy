import React from 'react';
import MyTool from '../test1/MyTool';
import MyParam from '../test1/MyParam';
import MyData from '../test1/MyData';
import { TabLayout } from '../components/tablayout/TabLayout';
import { StyleSheet, View } from 'react-native';
import Button from '../components/Button';

export default class MinePage extends React.Component {
  static navigationOptions = {
    title: 'MinePage'
  };
  state = {
    myData: MyData
  };
  myTool: MyTool = new MyTool();
  tabLayoutRef = React.createRef();

  constructor(props) {
    super(props);
    this.myTool.listener = {
      onGetData: (myData) => {
        console.log('这是myData:' + JSON.stringify(myData));
        this.setState({ myData: JSON.stringify(myData.name) });
      }
    };
    // this.myTool.getData(new MyParam())

    this.myTool.request(new MyParam()).then((response) => {
      this.myTool.getData(new MyParam());
      // this.setState({myData: JSON.stringify(response.data.name)})
    }).catch((result) => {

    });
  }

  render() {
    return <View>
      <TabLayout
        selectedTab={ this.state.selectedTab }
        style={ styles.tableLayout }
        onTabSelect={ {
          onTabReselected(tab) {
          },
          onTabSelected(tab) {
          },
          onTabUnselected(tab) {
          }
        } }
        ref={ (tabLayout) => {
          if (tabLayout != null) {
            this.tabLayoutRef.current = tabLayout;
            for (let i = 0; i < 10; i++) {
              let tab = tabLayout.newTab();
              if (i % 2 === 0)
                tab.setText('哈哈哈哈' + i);
              else
                tab.setText('哈哈' + i);
              tabLayout.addTab(tab, i, i === 0);
            }
          }
        }
        }/>

      <Button title="0" onPress={ () => {
        this.setState({ selectedTab: this.tabLayoutRef.current.getTabs()[0] });
      } } style={ {} }/>
      <Button title="1" onPress={ () => {
        this.setState({ selectedTab: this.tabLayoutRef.current.getTabs()[1] });
      } } style={ {} }/>
      <Button title="2" onPress={ () => {
        this.setState({ selectedTab: this.tabLayoutRef.current.getTabs()[2] });
      } } style={ {} }/>
      <Button title="3" onPress={ () => {
        this.setState({ selectedTab: this.tabLayoutRef.current.getTabs()[3] });
      } } style={ {} }/>
      <Button title="4" onPress={ () => {
        this.setState({ selectedTab: this.tabLayoutRef.current.getTabs()[4] });
      } } style={ {} }/>
      <Button title="5" onPress={ () => {
        this.setState({ selectedTab: this.tabLayoutRef.current.getTabs()[5] });
      } } style={ {} }/>
      <Button title="6" onPress={ () => {
        this.setState({ selectedTab: this.tabLayoutRef.current.getTabs()[6] });
      } } style={ {} }/>
      <Button title="7" onPress={ () => {
        this.setState({ selectedTab: this.tabLayoutRef.current.getTabs()[7] });
      } } style={ {} }/>
      <Button title="8" onPress={ () => {
        this.setState({ selectedTab: this.tabLayoutRef.current.getTabs()[8] });
      } } style={ {} }/>
      <Button title="9" onPress={ () => {
        this.setState({ selectedTab: this.tabLayoutRef.current.getTabs()[9] });
      } } style={ {} }/>

    </View>;
  }
}
const styles = StyleSheet.create({
  tableLayout: {
    height: 50
  }
});