import React from 'react';
import { ActivityIndicator, FlatList, Image, ListRenderItemInfo, RefreshControl, Text, TextInput, View, Pressable, Keyboard } from 'react-native';
import CookMenu from '../../data/CookMenu';
import CommentBean from '../../data/CommendBean';
import requestService from '../../http/RequestService';
import AppConfig from '../../config/AppConfig';
import { ColorBgInput, ColorGray, ColorGrayLight, ColorTheme, ColorWhite, TextColorLight, TextColorMain } from '../../../resources/Colors';
import Button from '../../components/Button';
import InputDialog from '../../dialog/InputDialog';

let icPraise = require('../../../resources/images/ic_praise.png');
let icPraised = require('../../../resources/images/ic_praised.png');
type Props = {
  cookMenu: CookMenu
}
export default class CommentPage extends React.Component<Props> {

  state = {
    commendList: [],
    isLoading: false,
    replyDialogVisible: false,
    replyDialogPlaceHolder: '',
    //输入评论内容
    commentInput: ''
  };

  pageNo: number = 1;
  pageSize: number = 10;
  //willReplyCommentBean = null  则评论
  // !=null 回复
  willReplyCommentBean: CommentBean;

  constructor(props) {
    super(props);
    this.queryData(this.pageNo, this.pageSize);
  }

  queryData(pageNo: number, pageSize: number) {
    if (this.props.cookMenu.id !== undefined) {
      this.setState({ isLoading: true });
      requestService.queryCookCommendList(AppConfig.userId, this.props.cookMenu.id, pageNo, pageSize, {
        onSuccess: (result) => {
          let tempDataList: Array<CommentPage>;
          if (result.data.currentPage === 1) {
            tempDataList = result.data.dataList;
          } else {
            tempDataList = this.state.commendList;
            result.data.dataList.forEach((item) => {
              tempDataList.push(item);
            });
          }
          this.pageNo = result.data.currentPage;
          if (tempDataList === null || tempDataList === undefined) tempDataList = [];
          this.setState({ commendList: tempDataList, isLoading: false });
        },
        onError: (errCode, msg) => {
        }
      });
    }
  }

  render(): React.ReactNode {
    return <View style={ { flex: 1 } }>
      {/*回复*/ }
      <InputDialog
        inputProps={ { placeholder: this.state.replyDialogPlaceHolder, maxLength: 100 } }
        onClick={ (dialog, which) => {

        } }
        onInput={ (dialog, which, text) => {
          this.setState({ replyDialogVisible: false });
          if (which === 'BUTTON_POSITIVE') {
            this.commitComment(text, this.replyToCommentBean);
          }
        } }
        onDismiss={ () => {
          this.replyToCommentBean = undefined;
          this.setState({ replyDialogVisible: false });
        } }
        positiveText={ '回复' }
        negationText={ '取消' }
        visible={ this.state.replyDialogVisible }/>
      {/*评论列表*/ }
      <FlatList
        style={ { marginBottom: 60 } }
        keyExtractor={ (value, index) => {return index;} }

        refreshControl={ <RefreshControl
          onRefresh={ () => {this.queryData(1, this.pageSize);} }
          refreshing={ this.state.isLoading }/> }

        onEndReachedThreshold={ 0.01 }
        onEndReached={ () => {this.queryData(this.pageNo + 1, this.pageSize);} }

        ListFooterComponent={ () =>
          <View style={ { alignItems: 'center' } }>
            <ActivityIndicator animating={ true } color={ ColorTheme } style={ { marginTop: 5 } }/>
            <Text style={ { marginBottom: 5 } }>加载中...</Text>
          </View>
        }

        data={ this.state.commendList }
        renderItem={ (itemInfo: ListRenderItemInfo<CommentBean>) => {
          let itemBean: CommentBean = itemInfo.item;
          return <View style={ { paddingLeft: 15, paddingRight: 15, paddingTop: 10 } }>
            <Pressable onPress={ () => {
              this.replyToCommentBean = itemBean;
              this.setState({ replyDialogVisible: true, replyDialogPlaceHolder: '回复:' + itemBean.userNickName });
            } }>
              <View>
                {/*头像*/ }
                <Image style={ { marginTop: 15, position: 'absolute', width: 35, height: 35, borderRadius: 20 } } source={ { uri: itemBean.userIcon } }/>
                {/*用户名*/ }
                <Text style={ { marginLeft: 50, fontSize: 18, color: TextColorMain } }>{ itemBean.userNickName }</Text>
                {/*创建时间*/ }
                <Text style={ { marginLeft: 50, fontSize: 13, color: TextColorLight } }>{ itemBean.createTime }</Text>
                {/*评论内容*/ }
                <Text style={ { marginLeft: 50, marginTop: 10, fontSize: 14, color: TextColorLight } }>{ itemBean.content }</Text>
              </View>
            </Pressable>
            <FlatList keyExtractor={ (value, index) => {return index;} }
                      data={ itemBean.subComments }
                      renderItem={ (subItemInfo: ListRenderItemInfo<CommentBean>) => {
                        return <View style={ { marginLeft: 50, backgroundColor: '#dddddd', marginTop: 1 } }>
                          {/*用户名*/ }
                          <Text style={ { position: 'absolute', fontSize: 14, fontWeight: 'bold', color: TextColorMain } }>{ subItemInfo.item.userNickName + ': ' }</Text>
                          {/*评论内容*/ }
                          <Text style={ { fontSize: 14, color: TextColorLight } }>{ subItemInfo.item.userNickName + ': ' + subItemInfo.item.content }</Text>
                        </View>;
                      } }/>
            {/*点赞数*/ }
            <Text style={ { position: 'absolute', marginLeft: 'auto', top: 22, right: 48, fontSize: 16, color: TextColorMain } }>{ itemInfo.item.praiseNum }</Text>
            {/*点赞logo*/ }
            <Pressable
              style={ { width: 30, right: 15, top: 15, position: 'absolute', marginLeft: 'auto', height: 30 } }
              onPress={ () => {
                //  点赞
                this.requestPraise(itemBean);
              } }>
              <Image source={ itemBean.isPraised === 1 ? icPraised : icPraise } style={ { width: 30, height: 30 } }/>
            </Pressable>
            <View style={ { marginTop: 10, backgroundColor: ColorGray, height: 1, width: '100%' } }/>
          </View>;
        } }/>
      {/*  评论/回复*/ }
      <View style={ { flexDirection: 'row', height: 55, paddingTop: 8, paddingBottom: 8, paddingLeft: 10, paddingRight: 10, position: 'absolute', marginTop: 'auto', bottom: 0, width: '100%', backgroundColor: ColorWhite } }>
        {/*输入框*/ }
        <TextInput multiline={ true } value={ this.state.commentInput } onChangeText={ (text) => {this.setState({ commentInput: text });} } placeholder={ '请输入评论内容' } style={ { padding: 5, marginRight: 80, height: '100%', width: '83%', backgroundColor: ColorBgInput, borderRadius: 5 } }/>
        {/*发送按钮*/ }
        <Button onPress={ () => {this.commitComment(this.state.commentInput);} } title={ '评论' } style={ { position: 'absolute', marginLeft: 'auto', color: ColorWhite, right: 0, backgroundColor: ColorTheme, borderRadius: 5, width: '15%', height: '100%' } }/>
      </View>
    </View>;
  }

  /**
   * 评论/回复
   */
  commitComment(content: String, replyToCommentBean?: CommentBean) {
    requestService.cookMenuCommentAddComment(
      AppConfig.userId,
      this.props.cookMenu.id,
      replyToCommentBean === undefined || replyToCommentBean === null ? 0 : replyToCommentBean.id,
      content,
      {
        onSuccess: (result) => {
          console.log(JSON.stringify(result));
          if (replyToCommentBean !== null && replyToCommentBean !== undefined) {
            //回复
            if (replyToCommentBean.subComments === null) {
              replyToCommentBean.subComments = [];
            }
            replyToCommentBean.subComments.unshift(result.data);
            this.replyToCommentBean = null;
            this.setState({ commendList: this.state.commendList });
          } else {
            //评论 
            Keyboard.dismiss();
            this.state.commendList.splice(0, 0, result.data);
            this.setState({ commendList: this.state.commendList, commentInput: '' });
          }
        },
        onError: (errCode, msg) => {

        }
      });
  }

  /**
   * 点赞
   * @param itemBean
   */
  requestPraise(itemBean: CommentBean) {
    if (!this.isPraising) {
      this.isPraising = true;
      requestService.cookMenuCommentPraise(AppConfig.userId, itemBean.id, itemBean.isPraised === 1 ? 0 : 1,
        {
          onSuccess: (response) => {
            //更新点赞状态
            itemBean.isPraised = response.data.praise;
            itemBean.praiseNum = response.data.praise === 1 ? itemBean.praiseNum + 1 : itemBean.praiseNum - 1;
            this.setState({ commendList: this.state.commendList });
            this.isPraising = false;
          },
          onError: (err, msg) => {
            this.isPraising = false;
          }
        });
    }
  }

}