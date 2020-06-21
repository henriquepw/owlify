import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Card from '../../../src/components/atoms/Card';
import Icon from '../../../src/components/atoms/GatewayIcon';

storiesOf('Card', module)
  .add('Default', () => (
    <Card title="Location 1" subTitle="Create at 04/04/2020" Icon={<Icon />} />
  ))
  .add('Default selected', () => (
    <Card
      isSelected
      title="Location 1"
      subTitle="Create at 04/04/2020"
      Icon={<Icon />}
    />
  ))
  .add('Vertical', () => (
    <Card
      isVertical
      title="Location 1"
      subTitle="Create at 04/04/2020"
      Icon={<Icon />}
    />
  ))
  .add('Vertical selected', () => (
    <Card
      isVertical
      isSelected
      title="Location 1"
      subTitle="Create at 04/04/2020"
      Icon={<Icon />}
    />
  ));
