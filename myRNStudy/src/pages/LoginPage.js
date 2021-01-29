import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, StatusBar, StyleSheet, TextInput, View } from "react-native";
import Button from "../components/Button";
import LoadingDialog from "../dialog/LoadingDialog";
import { BASE_URL } from "../http/HttpConfig";

export default class LoginPage extends React.Component {
    dialogRef = React.createRef();

    constructor() {
        super();
        this.state = {
            userName: "",
            password: "",
            isDialogChange: false,
            loadingDialogText: "",
            loadingDialogVisible: false,
        };
        this.getAccountInfo();
    }

    /**
     * 获取帐号信息
     */
    getAccountInfo() {
        AsyncStorage.getItem("userName")
            .then((userName) => {
                this.setState({ userName: userName });
            });
        AsyncStorage.getItem("password")
            .then((password) => {
                this.setState({ password: password });
            });
    }

    jumpPage() {
    }

    /**
     * 保存帐号信息
     */
    saveAccountInfo(userModule) {
        AsyncStorage.setItem("userName", this.state.userName);
        AsyncStorage.setItem("password", this.state.password);
        AsyncStorage.setItem("useModule", userModule);
        //  console.log(this.state.userName + "_" + this.state.password + "\n" + userModule);
    }

    /**
     *登陆
     */
    onLoginPress() {
        if (this.state.userName == null) {
            alert("请输入帐号");
        } else if (this.state.password == null) {
            alert("请输入密码");
        } else {
            //展示dialog
            this.dialogRef.current.show();
            this.requestLogin();
        }
    }

    /**
     * 登录
     * */
    requestLogin() {
        const url = BASE_URL + "/user/login";

        let formBody = new FormData();
        formBody.append("account", this.state.userName);
        formBody.append("password", this.state.password);

        fetch(url, {
            method: "POST", //请求方法 默认get
            headers: {
                "Accept": "application/json",
                "Content-Type": "multipart/form-data", //数据格式 json或者key-value形式
            },
            body: formBody,
        })
            .then(response => {
                console.log("status->" + response.status);
                if (response.ok) {
                    console.log("请求ok");
                } else {
                    console.log("请求不ok");
                }
                return response.json();
            })
            .then((result) => {
                //   console.log(result);
                this.saveAccountInfo(JSON.stringify(result));
            })
            .catch(err => {
                console.log("请求失败->" + err.toString());
            })
            .done(result => {
                console.log("请求完成");
                //this.dialogRef.current.dismiss();
            });
    }

    render() {
        return <View
            style={styles.root}>
            {/*加载dialog */}
            <LoadingDialog ref={this.dialogRef} cancelable={false} />
            {/* 状态栏 */}
            <StatusBar backgroundColor="#981090" />
            {/* logo */}
            <Image
                style={styles.logo}
                source={require("../../resources/images/dog.png")} />
            {/* 帐号 */}
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
            {/* 密码 */}
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
                    onChangeText={(text) => this.state.password = text} />
            </View>
            {/* 登录 */}
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
