import React from 'react';

import { storiesOf } from '@storybook/react-native';

import GatewayIcon from '../../../src/components/atoms/GatewayIcon';

import { backgroundDark } from '../../decorators';

const size = 180;

storiesOf('Gateway Icon')
  .add('Default', () => <GatewayIcon iconSize={size} />)
  .add('Wihout Background', () => (
    <GatewayIcon background={false} iconSize={size} />
  ));

storiesOf('Gateway Icon light color')
  .addDecorator(backgroundDark)
  .add('Light', () => <GatewayIcon color="light" iconSize={size} />)
  .add('Light Wihout Background', () => (
    <GatewayIcon color="light" background={false} iconSize={size} />
  ));
