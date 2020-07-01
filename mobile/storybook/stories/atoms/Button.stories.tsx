import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Button from '../../../src/components/atoms/Button';

storiesOf('Button', module)
  .add('DEFAULT', () => <Button type="Filled" text="DEFAULT" />)
  .add('DISABLED', () => <Button type="Focused" text="DISABLED" />)
  .add('ATTENTION', () => <Button type="Errored" text="ATTENTION" />)
  .add('WITH ICON', () => (
    <Button type="Filled" text="WITH ICON" hasIcon nameIcon="box" />
  ));
