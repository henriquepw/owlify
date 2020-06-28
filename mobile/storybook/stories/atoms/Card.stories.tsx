import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Card from '@atoms/Card';
import Icon from '@atoms/GatewayIcon';

const empty = (): string => '';

storiesOf('Card', module)
  .add('Default', () => (
    <Card
      onPress={empty}
      title="Location 1"
      subTitle="Create at 04/04/2020"
      Icon={<Icon />}
    />
  ))
  .add('Default selected', () => (
    <Card
      isSelected
      onPress={empty}
      title="Location 1"
      subTitle="Create at 04/04/2020"
      Icon={<Icon />}
    />
  ))
  .add('Vertical', () => (
    <Card
      isVertical
      onPress={empty}
      title="Location 1"
      subTitle="Create at 04/04/2020"
      Icon={<Icon />}
    />
  ))
  .add('Vertical selected', () => (
    <Card
      isVertical
      isSelected
      onPress={empty}
      title="Location 1"
      subTitle="Create at 04/04/2020"
      Icon={<Icon />}
    />
  ));
