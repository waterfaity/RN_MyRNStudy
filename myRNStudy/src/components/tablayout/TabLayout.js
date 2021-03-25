// import React from "react";
import React from 'react';

import {ColorValue, ScrollView, Text, View} from "react-native";
import Tab from "./Tab";
import TabView from "./TabView";
import {ColorTheme} from "../../../resources/Colors";
import type OnTabSelectedListener from "./OnTabSelectListener";
import type {ViewProps} from "react-native/Libraries/Components/View/ViewPropTypes";

/**
 * 自定义navigationBar
 * 属性传递参数
 */

type TabLayoutProps = $ReadOnly<{|
    normalColor?: ColorValue,
    selectedColor?: ColorValue,
    tabTextSize?: number,
    paddingHor?: number,
    onTabSelectedListener?: OnTabSelectedListener,
    style?: ViewProps
|}>;


export class TabLayout extends React.Component<TabLayoutProps> {

    selectedTab: Tab
    //属性默认值
    static defaultProps = {
        normalColor: "#333333",
        selectedColor: ColorTheme,
        tabTextSize: 14,
        paddingHor: 10,
    };


    state = {
        tabs: [],
        indicateLeft: 10,
        indicateWidth: 30,
    }

    constructor(props) {
        super(props);
        this.that = this
    }


    /**
     * 创建tab
     * @returns {Tab}
     */
    newTab(): Tab {
        let tab = new Tab();
        tab.parent = this
        tab.view = (<TabView
            ref={(tabView: TabView) => {
                if (tabView != null) {
                    tabView.props.tab.viewRef.current = tabView
                    tabView.setSelect(tab === this.selectedTab)
                }
            }}
            minWidth={this.getTabMinWidth()}
            tab={tab}/>)
        return tab
    }


    getTabMinWidth() {
        return 50
    }


    /**
     * 添加tab
     * @param tab
     * @param position
     * @param selected
     */
    addTab(tab: Tab, position: number, selected: boolean) {
        debugger
        if (position === undefined) {
            position = this.state.tabs.length
        }
        let sliceStart = this.state.tabs.slice(0, position);
        let sliceEnd = this.state.tabs.slice(position)

        sliceStart.push(tab)
        sliceStart.concat(sliceEnd)
        this.state.tabs = sliceStart
        if (selected)
            tab.select()
        this.setState({tabs: this.state.tabs})
    }

    /**
     * 选中
     * @param selectedTab
     */
    selectTab(selectedTab: Tab) {
        if (this.selectedTab === selectedTab) {
            //监听:重新选中
            this.props.onTabSelectedListener?.onTabReselected(selectedTab)
            //更新选中状态
            this.updateSelect(selectedTab);
        } else {
            //监听:旧tab取消选中
            this.props.onTabSelectedListener?.onTabUnselected(this.selectedTab)
            //设置当前选中的tab
            this.selectedTab = selectedTab
            //监听:选中新的tab
            this.props.onTabSelectedListener?.onTabSelected(this.selectedTab)
            //更新选中状态
            this.updateSelect(selectedTab);
        }
    }

    /**
     * 更新状态 长度/位置/动画过度
     * @param selectedTab
     */
    updateSelect(selectedTab) {
        //计算指示条 坐标
        let left = 0
        this.state.tabs.forEach((tab: Tab, index) => {
            //tab.viewRef.current !=null
            // 判断初始化是否完成
            if (tab.viewRef.current != null) {
                //遍历所有 并更新
                tab.viewRef.current.setSelect(selectedTab === tab)

                //遍历当前的tab的宽度
                let tabViewWidth = tab.viewRef.current.tabViewWidth
                //如果遍历的tab 与已经选中tab 相等  则设置指示条left/width
                if (selectedTab === tab) {
                    left += this.props.paddingHor
                    let width = tabViewWidth - 2 * this.props.paddingHor
                    this.setState({indicateLeft: left, indicateWidth: width})
                } else {
                    left += tabViewWidth
                }
            }
        })
    }

    setTabTextColors(normalColor: ColorValue, selectedColor: ColorValue) {
        this.normalColor = normalColor
        this.selectedColor = selectedColor
        this.setState({tabs: this.state.tabs})
    }

    render() {
        return (<View style={this.props.style}>
            <ScrollView
                showsHorizontalScrollIndicator={false}
                persistentScrollbar={false}
                horizontal={true}>
                <View>
                    <View style={{flex: 1, flexDirection: "row"}}>
                        {this.generateTabViews()}
                    </View>
                    <View style={{
                        flexDirection: "row",
                        width: "100%",
                    }}>
                        <View style={{
                            marginLeft: this.state.indicateLeft,
                            width: this.state.indicateWidth,
                            height: 3,
                            borderRadius: 4,
                            backgroundColor: ColorTheme
                        }}/>
                    </View>
                </View>
            </ScrollView>
        </View>)
    }

    /**
     * 获取tabViews
     * @returns {[]}
     */
    generateTabViews() {
        let tabViews = []
        this.state.tabs.forEach(((tab: Tab) =>
                tabViews.push((tab.view))
        ))
        return tabViews;
    }
}
