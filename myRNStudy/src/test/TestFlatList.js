import React from 'react';
import { FlatList, Text } from 'react-native';

const TestFlatList = () => {

  return <FlatList
    renderItem={ ({ item }) => {
      return <Text>{ item.key }</Text>;
    }
    }
    data={ [{ key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' },
      { key: '12' }] }/>;
};
export default TestFlatList;