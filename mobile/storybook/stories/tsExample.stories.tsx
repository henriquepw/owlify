import React from 'react';
import { Text, View } from 'react-native';

import { storiesOf } from '@storybook/react-native';

interface Props {
  text: string;
}
const Simple: React.FC<Props> = ({ text }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>{text}</Text>
  </View>
);

storiesOf('Test', module).add('default', () => (
  <Simple text="Typescript works!" />
));
