import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Header from '@molecules/Header';

storiesOf('Header', module)
  .add('Default', () => <Header>This is a Header</Header>)
  .add('Elevated', () => <Header isElevated>This is a Header elevated</Header>);
