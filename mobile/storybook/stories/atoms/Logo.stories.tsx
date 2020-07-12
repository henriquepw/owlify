import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Logo from '@atoms/Logo';

import { backgroundDark } from '../../decorators';

const size = 180;

storiesOf('Logo', module)
  .add('Default', () => <Logo size={size} />)
  .add('Wihout Background', () => <Logo background={false} size={size} />);

storiesOf('Logo light color', module)
  .addDecorator(backgroundDark)
  .add('Light', () => <Logo color="light" size={size} />)
  .add('Light Wihout Background', () => (
    <Logo color="light" background={false} size={size} />
  ));
