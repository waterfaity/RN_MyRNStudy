import React from 'react';
import { SectionList, Text } from 'react-native';

const TestSectionList = () => {
  return <SectionList
    renderItem={ ({ item }) => {
      return <Text>{ item }</Text>;
    } }
    sections={ [
      { title: 'A', data: ['Al', 'Al'] },
      { title: 'B', data: ['Bl', 'Bl'] },
      { title: 'C', data: ['Cl', 'Cl'] },
      { title: 'D', data: ['Dl', 'Dl'] },
      { title: 'E', data: ['El', 'El'] },
      { title: 'F', data: ['Fle', 'Fle', 'Fle', 'Fle', 'Fle', 'Fle'] },
      { title: 'G', data: ['Gle', 'Gle', 'Gle', 'Gle', 'Gle', 'Gle'] },
      { title: 'H', data: ['Hle', 'Hle', 'Hle', 'Hle', 'Hle', 'Hle'] },
      { title: 'I', data: ['Ile', 'Ile', 'Ile', 'Ile', 'Ile', 'Ile'] },
      { title: 'J', data: ['Jle', 'Jle', 'Jle', 'Jle', 'Jle', 'Jle'] },
      { title: 'K', data: ['Kle', 'Kle', 'Kle', 'Kle', 'Kle', 'Kle'] }
    ] }
    renderSectionHeader={ ({ section }) => {
      return <Text>{ section.title }</Text>;
    } }
    keyExtractor={ (item, index) => index }
  />;
};
export default TestSectionList; 