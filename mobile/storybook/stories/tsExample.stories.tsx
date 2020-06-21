import React from 'react';
/* import { Text, View } from 'react-native'; */

import { storiesOf } from '@storybook/react-native';

import { Attention } from './Buttom/Attention';
import { Default } from './Buttom/Default';
import { Disabled } from './Buttom/Disabled';
import { WithIcon } from './Buttom/With_icon';

/* interface Props {
  text: string;
}
const Simple: React.FC = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Typescript works!!</Text>
  </View>
);

storiesOf('Test', module).add('default', () => <Simple />); */
storiesOf('Test', module).add('DEFAULT', () => <Default text="default" />);
storiesOf('Test', module).add('DISABLED', () => <Disabled text="DISABLED" />);
storiesOf('Test', module).add('ATTENTION', () => <Attention text="ATTENTION" />);
storiesOf('Test', module).add('WITH ICON', () => <WithIcon text="WITH ICON" />);
