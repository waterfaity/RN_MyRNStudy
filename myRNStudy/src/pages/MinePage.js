import React from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppConfig from '../config/AppConfig';
import { ColorGray, ColorGrayLight, ColorTheme, ColorWhite } from '../../resources/Colors';

//ART 包
//import Path from 'art/core/path';
import { Path } from '@react-native-community/art';
import LinearGradient from '@react-native-community/art/lib/LinearGradient';
import Shape from '@react-native-community/art/lib/Shape';
import Surface from '@react-native-community/art/lib/Surface';

//konva
import Konva from 'konva';
import { Stage, Layer, Rect, Text as KonvaText } from 'react-konva';
import Button from '../components/Button';

export default class MinePage extends React.Component {
  static navigationOptions = {
    title: 'MinePage'
  };
  state = { visible: true };

  constructor(props) {
    super(props);

  }

  render() {

    //绘制路径
    const path = Path();
    path.moveTo(0, 0);
    path.lineTo(Dimensions.get('window').width, 0);
    path.lineTo(Dimensions.get('window').width, 120);
    path.lineTo(0, 120);
    path.moveTo(0, 0);
    //颜色过度
    let linearGradient = LinearGradient(
      {
        .13: 'red',
        .26: 'orange',
        .39: 'yellow',
        .53: 'green',
        .65: 'aqua',
        .78: 'blue',
        .91: 'purple'
      },
      '0', '0', '' + Dimensions.get('window').width, '120');

    return <ScrollView>
      <View>
        <Surface width={ Dimensions.get('window').width } height={ 120 } style={ { position: 'absolute', backgroundColor: '#aa990033' } }>
          <Shape
            d={ path }
            fill={ linearGradient }/>
        </Surface>

        <View style={ { flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: '#12998811', paddingBottom: 20, paddingTop: 20 } }>
          <Image style={ { marginLeft: 20, height: 80, width: 80, borderRadius: 40 } } source={ { uri: AppConfig.userBean.userIcon } }/>
          <View style={ { marginLeft: 20 } }>
            <Text style={ { color: ColorWhite, fontWeight: 'bold', fontSize: 16 } }>{ '姓名:' + AppConfig.userBean.realName }</Text>
            <Text style={ { color: ColorWhite } }>{ '生日:' + AppConfig.userBean.birthday }</Text>
            <Text style={ { color: ColorWhite } }>{ '手机:' + AppConfig.userBean.mobile }</Text>
          </View>
        </View>
        <Text>我的菜谱</Text>
      </View>
    </ScrollView>;
  }
}
const styles = StyleSheet.create({
  tableLayout: {
    height: 50
  }
});