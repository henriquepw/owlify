import React from 'react';

import { storiesOf } from '@storybook/react-native';

import { Buttom } from '.';

storiesOf('Buttom', module).add('DEFAULT', () => <Buttom type={1} text={"DEFAULT"} hasIcon={false} />);
