import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const TestTextInput = () => {
  const [text, setText] = useState('');
  return <View>
    <TextInput style={ { fontSize: 20 } } onChangeText={ content => setText(content) }>说你好</TextInput>
    <Text>{ text }</Text>
  </View>;
};
export default TestTextInput;