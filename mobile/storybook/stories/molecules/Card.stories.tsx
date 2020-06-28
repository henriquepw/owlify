import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Card from '@molecules/Card';

const empty = (): string => '';

storiesOf('Card', module)
  .add('Default', () => (
    <Card
      onPress={empty}
      title="Location 1"
      subTitle="Create at 04/04/2020"
      iconName="gateway"
    />
  ))
  .add('Default selected', () => (
    <Card
      isSelected
      onPress={empty}
      title="Location 1"
      subTitle="Create at 04/04/2020"
      iconName="gateway"
    />
  ))
  .add('Vertical', () => (
    <Card
      isVertical
      onPress={empty}
      title="Location 1"
      subTitle="Create at 04/04/2020"
      iconName="gateway"
    />
  ))
  .add('Vertical selected', () => (
    <Card
      isVertical
      isSelected
      onPress={empty}
      title="Location 1"
      subTitle="Create at 04/04/2020"
      iconName="gateway"
    />
  ));
