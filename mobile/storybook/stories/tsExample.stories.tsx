import React from 'react';
/* import { Text, View } from 'react-native'; */

import { storiesOf } from '@storybook/react-native';

import { Default } from './Buttom/index';

/* interface Props {
  text: string;
}
const Simple: React.FC = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Typescript works!!</Text>
  </View>
);

storiesOf('Test', module).add('default', () => <Simple />); */
storiesOf('Test', module).add('DEFAULT', () => <Default text="DEFAULT" />);
