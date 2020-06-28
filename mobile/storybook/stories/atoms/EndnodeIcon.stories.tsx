import React from 'react';

import { storiesOf } from '@storybook/react-native';

import EndnodeIcon from '@atoms/EndnodeIcon';

import { backgroundDark } from '../../decorators';

const size = 180;

storiesOf('End-node Icon')
  .add('Default', () => <EndnodeIcon size={size} />)
  .add('Wihout Background', () => (
    <EndnodeIcon background={false} size={size} />
  ));

storiesOf('End-node Icon light color')
  .addDecorator(backgroundDark)
  .add('Light color', () => <EndnodeIcon color="light" size={size} />)
  .add('Light color Wihout Background', () => (
    <EndnodeIcon color="light" background={false} size={size} />
  ));
