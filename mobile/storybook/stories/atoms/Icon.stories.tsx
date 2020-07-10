import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Icon from '@atoms/Icon';

import { backgroundDark } from '../../decorators';

const size = 180;

storiesOf('Icon', module)
  .add('Default', () => <Icon name="gateway" size={size} />)
  .add('Wihout Background', () => (
    <Icon name="gateway" background={false} size={size} />
  ));

storiesOf('Icon light color', module)
  .addDecorator(backgroundDark)
  .add('Light color', () => <Icon name="gateway" color="light" size={size} />)
  .add('Light color Wihout Background', () => (
    <Icon name="gateway" color="light" background={false} size={size} />
  ));
