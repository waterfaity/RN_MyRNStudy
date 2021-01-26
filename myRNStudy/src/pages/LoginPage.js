import React from 'react';
import { TextInput, View, Image, StyleSheet, StatusBar } from 'react-native';
import Button from '../components/Button';

export default class LoginPage extends React.Component {
    constructor() {
        super();
        this.state = { userName: null, password: null };

    }

    //登陆
    onLoginPress() {

        if (this.state.userName == null) {
            alert("请输入帐号");
        } else if (this.state.password == null) {
            alert("请输入密码");
        } else {
            alert(this.state.userName + "_" + this.state.password);
        }
    }

    //帐号
    onAccountInput(account) {
        this.state.userName = account;
    }

    //密码
    onPasswordInput(password) {
        this.state.password = password;
    }


    render() {
        return <View
            style={styles.root}>
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
                    onChangeText={(text) => this.onAccountInput(text)} />
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
                    placeholder="请输入密码"
                    onChangeText={(text) => this.onPasswordInput(text)} />
            </View>
            {/* 登录 */}
            <Button
                style={styles.login}
                title="登录"
                onPress={() => this.onLoginPress()} />
        </View>
    }
}

var styles = StyleSheet.create({
    logo: {
        borderRadius: 150,
        width: 150,
        height: 150
    },
    root: {
        alignItems: 'center',
        backgroundColor: '#981090',
        alignItems: 'center',
        paddingTop: '30%',
        height: '100%'
    },
    input_form: {
        marginTop: 20,
        width: '90%',
        flexDirection: "row",
        height: 50,
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10
    },
    image: {
        left: 10,
        width: 20,
        height: 20,
    },
    input: {
        left: 20,
        height: 40,
        width: '85%'
    },
    login: {
        marginTop: 40,
        width: '90%',
        height: 50
    }
})
