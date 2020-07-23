import React from 'react';

import { storiesOf } from '@storybook/react-native';

import LineGraph from '@molecules/LineGraph';

const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

storiesOf('Line Graph', module).add('Default', () => <LineGraph data={data} />);
