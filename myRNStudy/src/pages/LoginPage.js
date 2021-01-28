import React from "react";
import { Image, StatusBar, StyleSheet, TextInput, View } from "react-native";
import Button from "../components/Button";
import LoadingDialog from "../dialog/LoadingDialog";
import { BASE_URL } from "../http/HttpConfig";

export default class LoginPage extends React.Component {
  dialogRef = React.createRef();

  constructor() {
    super();
    this.state = {
      userName: "waterfairy",
      password: "123456",
      isDialogChange: false,
      loadingDialogText: "",
      loadingDialogVisible: false,
    };
  }

  //登陆
  onLoginPress() {
    if (this.state.userName == null) {
      alert("请输入帐号");
    } else if (this.state.password == null) {
      alert("请输入密码");
    } else {
      //展示dialog
      this.dialogRef.current.show();
      this.requestLogin().then((r) => {
        this.dialogRef.current.dismiss();
        alert("登录成功:" + r);
      });
    }
  }

  /**
   * 登录
   * */
  async requestLogin() {
    const url = BASE_URL + "/user/login";
    const params = {
      account: this.state.userName,
      password: this.state.password,
    };

    const options = {
      method: "POST",
      body: params,
    };
    let result = await fetch(url, options);
    result = await result.json();
    return result;
  }

  render() {
    return <View
      style={styles.root}>
      {/*加载dialog */
      }
      <LoadingDialog text={this.state.loadingDialogText}
                     visible={this.state.loadingDialogVisible}
                     cancelable={true}
                     ref={this.dialogRef} />
      {/* 状态栏 */
      }
      <StatusBar backgroundColor="#981090" />
      {/* logo */
      }
      <Image
        style={styles.logo}
        source={require("../../resources/images/dog.png")} />
      {/* 帐号 */
      }
      <View
        style={styles.input_form}>
        <Image
          style={styles.image}
          source={require("../../resources/images/user.png")} />
        <TextInput
          style={styles.input}
          placeholder="请输入帐号"
          defaultValue={this.state.userName}
          onChangeText={(text) => this.state.userName = text} />
      </View>
      {/* 密码 */
      }
      <View style={styles.input_form}>
        <Image
          style={styles.image}
          source={require("../../resources/images/pwd.png")} />
        <TextInput
          style={styles.input}
          textContentType="password"
          secureTextEntry={true}
          defaultValue={this.state.password}
          placeholder="请输入密码"
          onChangeText={(text) => this.state.userName = text} />
      </View>
      {/* 登录 */
      }
      <Button
        style={styles.login}
        title="登录"
        onPress={() => this.onLoginPress()} />
    </View>;
  }
}

const styles = StyleSheet.create({
  logo: {
    borderRadius: 150,
    width: 150,
    height: 150,
  },
  root: {
    alignItems: "center",
    backgroundColor: "#981090",
    paddingTop: "30%",
    height: "100%",
  },
  input_form: {
    marginTop: 20,
    width: "90%",
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
  },
  image: {
    left: 10,
    width: 20,
    height: 20,
  },
  input: {
    left: 20,
    height: 40,
    width: "85%",
  },
  login: {
    marginTop: 40,
    width: "90%",
    height: 50,
  },
});
