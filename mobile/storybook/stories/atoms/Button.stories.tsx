import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Button from '../../../src/components/atoms/Button';

storiesOf('Button', module)
  .add('DEFAULT', () => (
    <Button type="isFilled" text="DEFAULT" hasIcon={false} />
  ))
  .add('DISABLED', () => (
    <Button type="isFocused" text="DISABLED" hasIcon={false} />
  ))
  .add('ATTENTION', () => (
    <Button type="isErrored" text="ATTENTION" hasIcon={false} />
  ))
  .add('WITH ICON', () => <Button type="isFilled" text="WITH ICON" hasIcon />);
