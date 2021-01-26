import React, { Component } from "react";
import { Platform } from "react-native";
import LoginPage from "./src/pages/LoginPage";

export default class TestApp extends Component {
  render() {

    console.log(Platform.Version + Platform.select({ android: 12, ios: 23 }));
    return <LoginPage />;
  }
}

