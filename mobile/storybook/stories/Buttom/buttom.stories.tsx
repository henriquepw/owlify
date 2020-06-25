import React from 'react';

import { storiesOf } from '@storybook/react-native';

import { Buttom } from '.';

storiesOf('Buttom', module).add('DEFAULT', () => <Buttom type={0} text={"DEFAULT"} hasIcon={false} />);
storiesOf('Buttom', module).add('DISABLED', () => <Buttom type={1} text={"DISABLED"} hasIcon={false} />);
storiesOf('Buttom', module).add('ATTENTION', () => <Buttom type={2} text={"ATTENTION"} hasIcon={false} />);
storiesOf('Buttom', module).add('WITH ICON', () => <Buttom type={0} text={"WITH ICON"} hasIcon={true} />);
