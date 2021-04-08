import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, StatusBar, StyleSheet, TextInput, View } from 'react-native';
import Button from '../components/Button';
import LoadingDialog from '../dialog/LoadingDialog';
import requestService from '../http/RequestService';
import { ColorGray, ColorTheme, ColorWhite } from '../../resources/Colors';
import AppConfig from '../config/AppConfig';
import BaseResponse from '../http/BaseResponse';
import UserBean from '../data/UserBean';
import { BASE_URL } from '../http/HttpConfig';

export default class LoginPage extends React.Component {

  dialogRef = React.createRef();
  loginSuccess = false;

  constructor() {
    super();
    this.state = {
      userName: '',
      password: '',
      isDialogChange: false,
      loadingDialogText: '',
      loadingDialogVisible: false
    };
    this.getAccountInfo();
  }

  jumpHomePage(useModule: String) {
    this.props.navigation.navigate('MainPage', { userModule: useModule });
  }

  /**
   * 获取帐号信息
   */
  getAccountInfo() {
    AsyncStorage.getItem('userName').then((userName) => {
      this.setState({ userName: userName });
    });
    AsyncStorage.getItem('password').then((password) => {
      this.setState({ password: password });
    });
  }

  jumpPage() {
  }

  /**
   * 保存帐号信息
   */
  saveAccountInfo(userModule: String) {
    AsyncStorage.setItem('userName', this.state.userName);
    AsyncStorage.setItem('password', this.state.password);
    AsyncStorage.setItem('useModule', userModule);
    //  console.log(this.state.userName + "_" + this.state.password + "\n" + userModule);
  }

  /**
   *登陆
   */
  onLoginPress() {
    if (this.state.userName == null) {
      alert('请输入帐号');
    } else if (this.state.password == null) {
      alert('请输入密码');
    } else {
      //展示dialog
      this.dialogRef.current.show();
      requestService.login(this.state.userName, this.state.password, {
        onSuccess: (result: BaseResponse<UserBean>) => {
          AppConfig.userId = result.data.userId;
          AppConfig.userBean = result.data;
          this.dialogRef.current.dismiss();
          this.saveAccountInfo(JSON.stringify(result.data));
          //跳转页面
          AsyncStorage.getItem('useModule').then((useModule) => {
            console.log('获取到用户数据:' + useModule);
            //跳转页面传递参数 userModule
            this.jumpHomePage(useModule);
          });
        },
        onError: (errCode, errMsg) => {
          this.dialogRef.current.dismiss();
          alert(errMsg + ':' + BASE_URL);
        }
      });
    }
  }

  render() {
    return <View
      style={ styles.root }>
      {/*加载dialog */ }
      <LoadingDialog ref={ this.dialogRef } cancelable={ false }/>
      {/* 状态栏 */ }
      <StatusBar backgroundColor={ ColorTheme }/>
      {/* logo */ }
      <Image
        style={ styles.logo }
        source={ require('../../resources/images/dog.png') }/>
      {/* 帐号 */ }
      <View
        style={ styles.input_form }>
        <Image
          style={ styles.image }
          source={ require('../../resources/images/user.png') }/>
        <TextInput
          style={ styles.input }
          placeholder="请输入帐号"
          defaultValue={ this.state.userName }
          onChangeText={ (text) => this.state.userName = text }/>
      </View>
      {/* 密码 */ }
      <View style={ styles.input_form }>
        <Image
          style={ styles.image }
          source={ require('../../resources/images/pwd.png') }/>
        <TextInput
          style={ styles.input }
          textContentType="password"
          secureTextEntry={ true }
          defaultValue={ this.state.password }
          placeholder="请输入密码"
          onChangeText={ (text) => this.state.password = text }/>
      </View>
      {/* 登录 */ }
      <Button
        style={ styles.login }
        textProps={ { value: '登录' } }
        onPress={ () => this.onLoginPress() }/>
    </View>;
  }
}

const styles = StyleSheet.create({
  logo: {
    borderRadius: 150,
    width: 150,
    height: 150
  },
  root: {
    alignItems: 'center',
    backgroundColor: '#981090',
    paddingTop: '30%',
    height: '100%'
  },
  input_form: {
    marginTop: 20,
    width: '90%',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10
  },
  image: {
    left: 10,
    width: 20,
    height: 20
  },
  input: {
    left: 20,
    height: 40,
    width: '85%'
  },
  login: {
    width: '90%',
    height:50,
    marginTop: 40
  }
});
