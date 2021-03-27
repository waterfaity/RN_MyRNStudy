import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import CookMenu from '../../data/CookMenu';

type Props = {
  cookMenu?: CookMenu
}

export default class StepPage extends React.Component <Props> {
  state = {
    stepList: []
  };

  constructor(props) {
    super(props);
    this.state.stepList = props.cookMenu.stepList;
    this.setState({ stepList: this.state.stepList });
  }

  /**
   * 步骤
   * @returns {[]}
   */
  initCookStopViews() {
    let itemViews = [];
    this.state.stepList.forEach((cookStepBean: CookStepBean, index) => {
      itemViews.push(<View style={ styles.cook_step_container }>
        {
          this.getImage(cookStepBean)
        }
        <View style={ styles.cook_step_info_container }>
          <Text style={ styles.cook_step_title }>步骤{ (index + 1) + ':' + cookStepBean.title }</Text>
          <Text>时间: { cookStepBean.duration }分钟</Text>
          <Text>锅具: { cookStepBean.potName }</Text>
          <Text>温度: { cookStepBean.temperature }</Text>
        </View>
        <Text style={ styles.cook_step_introduce }>简介:{ cookStepBean.introduce }</Text>

      </View>);
    });
    if (itemViews.length === 0) itemViews.push((<Text>没有数据</Text>));
    return itemViews;
  }

  getImage(cookStepBean: CookStepBean) {
    return <Image style={ styles.cook_step_img } source={ { uri: cookStepBean.imgUrl } }/>;
  }

  render() {
    return <ScrollView
      style={ styles.introduce_scroll_view }>
      {
        this.initCookStopViews()
      }

    </ScrollView>;
  }

}

const styles = StyleSheet.create({
  introduce_scroll_view: {
    flex: 1
  },
  cook_step_container: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#dddddd'
  },
  cook_step_img: {
    borderRadius: 10,
    width: 150,
    height: 100
  },
  cook_step_title: {
    fontSize: 16,
    marginTop: 10
  },
  cook_step_introduce: {
    fontSize: 14,
    margin: 8
  },
  cook_step_info_container: {
    position: 'absolute',
    marginLeft: 160
  }
});