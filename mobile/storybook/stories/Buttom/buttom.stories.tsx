import React from 'react';

import { storiesOf } from '@storybook/react-native';

import { Buttom } from '.';

storiesOf('Test', module).add('Buttom', () => <Buttom type={1} text={"WITH ICON"} hasIcon={true} />);
