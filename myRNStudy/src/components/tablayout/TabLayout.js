// import React from "react";
import React from 'react';

import {
    ColorValue,
    ScrollView,
    Text,
    View,
    Animated,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Easing, CompositeAnimation
} from "react-native";
import Tab from "./Tab";
import TabView from "./TabView";
import {ColorTheme} from "../../../resources/Colors";
import type OnTabSelectedListener from "./OnTabSelectListener";
import type {ViewProps} from "react-native/Libraries/Components/View/ViewPropTypes";
import {EndResult} from "react-native/Libraries/Animated/src/animations/Animation";

/**
 * 自定义navigationBar
 * 属性传递参数
 */

type TabLayoutProps = $ReadOnly<{|
    //未选中颜色
    normalColor?: ColorValue,
    //选中颜色
    selectedColor?: ColorValue,
    //字体大小
    tabTextSize?: number,
    //tabView 水平方向padding
    tabPaddingHor?: number,
    //选择监听
    onTabSelectedListener?: OnTabSelectedListener,
    //样式
    style?: ViewProps,
    //选中的selectTab  用于外部设置指定的tab
    selectedTab?: Tab
|}>;


export class TabLayout extends React.Component<TabLayoutProps> {
    /**
     * 指示器更新用到的数据
     * @type {{toIndicateTranslateXValue: number, dIndicateTranslateXValue: number, currentWidthValue: number, currentIndicateTranslateXValue: number, dWidthValue: number, fromWidthValue: number, fromIndicateTranslateXValue: number, toWidthValue: number}}
     */
    animData = {
        //指示器 偏移x
        currentIndicateTranslateXValue: 0,
        fromIndicateTranslateXValue: 0,
        toIndicateTranslateXValue: 0,
        dIndicateTranslateXValue: 0,

        //指示器 宽度width
        currentWidthValue: 0,
        fromWidthValue: 0,
        toWidthValue: 0,
        dWidthValue: 0,

        //scrollView
        currentScrollX: 0,

    }

    /**
     * tabLayoutWidth
     */
    tabLayoutWidth
    /**
     * 指示器偏移动画
     */
    transAnim: CompositeAnimation
    /**
     * scrollView 引用
     * @type {React.RefObject<unknown>}
     */
    scrollViewRef = React.createRef()
    /**
     * 选中的tab
     */
    selectedTab: Tab
    //属性默认值
    static defaultProps = {
        normalColor: "#333333",
        selectedColor: ColorTheme,
        tabTextSize: 14,
        tabPaddingHor: 10,
    };


    state = {
        //tab集合
        tabs: [],
        //指示器宽度
        indicateWidth: 30,
        translateXAnimatedValue: new Animated.Value(0)
    }

    getTabs(): Tab[] {
        return this.state.tabs
    }


    constructor(props) {
        super(props);
        this.state.translateXAnimatedValue.addListener((state) => {
            //设置当前偏移值
            this.animData.currentIndicateTranslateXValue = state.value
            //当前动画进行到的的比例 ratio
            let ratio = (this.animData.currentIndicateTranslateXValue - this.animData.fromIndicateTranslateXValue) / this.animData.dIndicateTranslateXValue
            //计算当前比例的宽度
            let currentWidth = this.animData.fromWidthValue + ratio * this.animData.dWidthValue
            //校验
            if (this.animData.dWidthValue !== 0 && !isNaN(currentWidth)) {
                //设置当前宽度值
                this.animData.currentWidthValue = currentWidth
                //更新状态
                this.setState({indicateWidth: this.animData.currentWidthValue})
            }
        })
    }

    /**
     * 更新选中状态
     */
    componentDidUpdate(preProps) {
        //选中
        this.selectTab(this.props.selectedTab)
        //动画更新 tabLayout 位置 选中的居中显示
        if (preProps.selectedTab !== this.props.selectedTab)
            this.animScrollView()
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

    getTabMinWidth() {
        return 50
    }

    /**
     * 更新状态 长度/位置/动画过度
     * @param selectedTab
     */
    updateSelect(selectedTab) {
        //计算指示条 坐标需要的偏移值
        let indicateTranslateX = 0
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
                    indicateTranslateX += this.props.tabPaddingHor
                    let width = tabViewWidth - 2 * this.props.tabPaddingHor
                    this.animIndicator(indicateTranslateX, width)
                } else {
                    indicateTranslateX += tabViewWidth
                }
            }
        })
    }

    setTabTextColors(normalColor: ColorValue, selectedColor: ColorValue) {
        this.normalColor = normalColor
        this.selectedColor = selectedColor
        this.setState({tabs: this.state.tabs})
    }


    /**
     * 上次选中的tab  - > 本次选中的tab
     * 主要更新 指示器的 (indicateTranslateX,width)
     * @param indicateTranslateX
     * @param width
     */
    animIndicator(indicateTranslateX: number, width: number) {

        if (this.transAnim !== undefined) {
            this.transAnim.stop
            this.transAnim = undefined
        }

        //设置指示器偏移 from  /  to  /  d
        this.animData.fromIndicateTranslateXValue = this.animData.currentIndicateTranslateXValue
        this.animData.toIndicateTranslateXValue = indicateTranslateX
        this.animData.dIndicateTranslateXValue = this.animData.toIndicateTranslateXValue - this.animData.fromIndicateTranslateXValue

        //设置指示器宽度 from  /  to  /  d
        this.animData.fromWidthValue = this.animData.currentWidthValue
        this.animData.toWidthValue = width
        this.animData.dWidthValue = this.animData.toWidthValue - this.animData.fromWidthValue

        this.transAnim = Animated.timing(this.state.translateXAnimatedValue, {
            //线性差值器
            easing: Easing.linear,
            duration: 200,
            toValue: indicateTranslateX,
            //原生驱动方式
            useNativeDriver: true,
        })
        this.transAnim.start()
    }

    componentWillUnmount(): void {
    }

    /**
     *动画更新 tabLayout 位置 选中的居中显示
     *旧的scrollX - > 新的scrollX
     *
     */
    animScrollView() {
        let scrollView: ScrollView = this.scrollViewRef.current
        let scrollX = this.animData.toIndicateTranslateXValue +
            this.animData.currentScrollX -
            this.tabLayoutWidth / 2 +
            this.animData.toWidthValue / 2
        console.log("--------------------")

        console.log("this.animData.currentScrollX:" + this.animData.currentScrollX)
        console.log("--------------------")


        console.log("滚动值:" + scrollX)
        if (!isNaN(scrollX))
            scrollView.scrollTo({x: scrollX, y: 0, animated: true})
    }

    render() {
        return <View style={this.props.style}>
            {/*scrollView*/}
            <ScrollView
                onLayout={(event) => {
                    this.tabLayoutWidth = event.nativeEvent.layout.width
                }}
                ref={this.scrollViewRef}
                onMomentumScrollEnd={(event: NativeSyntheticEvent<NativeScrollEvent>) => {
                    this.animData.currentScrollX = event.nativeEvent.contentOffset.x
                }}
                showsHorizontalScrollIndicator={false}
                persistentScrollbar={false}
                horizontal={true}>
                <View>
                    {/*tabViews*/}
                    <View style={{flex: 1, flexDirection: "row"}}>
                        {this.generateTabViews()}
                    </View>
                    {/*指示器*/}
                    <Animated.View style={{
                        transform: [{
                            translateX: this.state.translateXAnimatedValue,
                        }],
                        width: this.state.indicateWidth,
                        height: 3,
                        borderRadius: 4,
                        backgroundColor: ColorTheme
                    }}/>
                </View>
            </ScrollView>
        </View>
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
