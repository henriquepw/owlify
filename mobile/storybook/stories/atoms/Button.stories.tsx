import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Button from '../../../src/components/atoms/Button';

storiesOf('Button', module)
  .add('DEFAULT', () => <Button type="isFilled" text="DEFAULT" />)
  .add('DISABLED', () => <Button type="isFocused" text="DISABLED" />)
  .add('ATTENTION', () => <Button type="isErrored" text="ATTENTION" />)
  .add('WITH ICON', () => <Button type="isFilled" text="WITH ICON" hasIcon />);
