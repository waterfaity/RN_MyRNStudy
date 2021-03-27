import React from 'react';
import { FlatList, Image, ListRenderItemInfo, Text, View } from 'react-native';
import CookMenu from '../../data/CookMenu';
import CommendBean from '../../data/CommendBean';
import requestService from '../../http/RequestService';
import AppConfig from '../../config/AppConfig';

type Props = {
  cookMenu: CookMenu
}
export default class CommendPage extends React.Component<Props> {

  state = {
    commendList: [],
    isLoading: false
  };

  pageNo: number = 1;
  pageSize: number = 10;
  that;

  constructor(props) {
    super(props);
    this.that = this;
    this.setState({});
    this.queryData(this.pageNo, this.pageSize);
  }

  queryData(pageNo: number, pageSize: number) {
    requestService.queryCookCommendList(AppConfig.userId, this.props.cookMenu.id, pageNo, pageSize, {
      onSuccess: (result) => {
        let tempDataList: Array<CommendPage>;
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

  render(): React.ReactNode {
    return <FlatList
      data={ this.state.commendList }
      renderItem={ (itemInfo: ListRenderItemInfo<CommendBean>) => {
        let itemBean: CommendBean = itemInfo.item;
        return <View>
          <Image source={ { uri: itemBean.userIcon } }/>
          <Text>{ itemInfo.item.content }</Text>
        </View>;
      } }/>;
  }
}