import React from 'react';

import { storiesOf } from '@storybook/react-native';

import GatewayIcon from '@atoms/GatewayIcon';

import { backgroundDark } from '../../decorators';

const size = 180;

storiesOf('Gateway Icon')
  .add('Default', () => <GatewayIcon size={size} />)
  .add('Wihout Background', () => (
    <GatewayIcon background={false} size={size} />
  ));

storiesOf('Gateway Icon light color')
  .addDecorator(backgroundDark)
  .add('Light', () => <GatewayIcon color="light" size={size} />)
  .add('Light Wihout Background', () => (
    <GatewayIcon color="light" background={false} size={size} />
  ));
