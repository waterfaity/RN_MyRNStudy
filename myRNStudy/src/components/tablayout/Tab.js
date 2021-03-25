import {TabLayout} from "./TabLayout";
import TabView from "./TabView";
import React, {RefObject} from "react";

export default class Tab {


    constructor() {
    }

    setText(text: String): Tab {
        this.text = text;
        return this
    }

    select() {
        this.parent.selectTab(this)
    }

    text: String
    parent: TabLayout
    view: TabView
    viewRef  = React.createRef ()
}