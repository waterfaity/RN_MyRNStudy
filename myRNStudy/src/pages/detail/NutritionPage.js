import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CookMenu from '../../data/CookMenu';
import { ColorGrayLight } from '../../../resources/Colors';

type Props = {
  cookMenu?: CookMenu
}

export default class NutritionPage extends React.Component <Props> {
  state = {
    nutritionList: null
  };

  constructor(props) {
    super(props);
    this.state.nutritionList = props.cookMenu.nutritionList;
    this.setState({ nutritionList: this.state.nutritionList });
  }

  /**
   *食材/营养
   * @returns {[]}
   */
  initMaterialViews(materialList?: CookMaterialBean[]) {
    let itemViews = [];
    materialList?.forEach((cookMaterialBean, index) => {
      itemViews.push(<View style={ styles.material_container }>
        <Text style={ styles.material }>{ cookMaterialBean.name }</Text>
        <Text style={ styles.material_phr }>{ cookMaterialBean.phr + cookMaterialBean.unit }</Text>
      </View>);
      if (index < materialList.length - 1) {
        itemViews.push(<View style={ styles.material_line }/>);
      }
    });
    if (itemViews.length === 0) itemViews.push((<Text>没有数据</Text>));
    return itemViews;
  }

  render() {
    return <ScrollView
      style={ styles.introduce_scroll_view }>
      { this.initMaterialViews(this.state.nutritionList) }
    </ScrollView>;
  }

}

const styles = StyleSheet.create({
  introduce_scroll_view: {
    flex: 1
  },
  material_container: {
    paddingBottom: 5,
    paddingTop: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  material: {
    fontSize: 16,
    marginLeft: 15
  },
  material_phr: {
    marginRight: 15,
    fontSize: 16,
    marginLeft: 15
  },
  material_line: {
    marginRight: 15,
    marginLeft: 15,
    height: 1,
    backgroundColor: ColorGrayLight
  }

});