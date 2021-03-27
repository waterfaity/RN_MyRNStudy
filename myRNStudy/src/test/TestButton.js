import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { CardButton } from 'miot/ui';

const TestButton = () => {

  const [count, setCount] = useState(0);
  const onPress = () => {
    setCount((preCount) => {
      return preCount + 1;
    });
  };

  return <View style={ { top: 100 } }>
    <Text>{ count }</Text>
    <CardButton onPress={ onPress } title="press"/>
    <Text>{ this.state.age }</Text>
    <Button title={ 'age_sum' } onPress={ this.state.age }/>
  </View>;
};
export default TestButton;
