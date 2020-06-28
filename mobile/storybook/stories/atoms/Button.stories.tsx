import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Button from '../../../src/components/atoms/Button';

storiesOf('Button', module)
  .add('DEFAULT', () => <Button type={0} text="DEFAULT" hasIcon={false} />)
  .add('DISABLED', () => <Button type={1} text="DISABLED" hasIcon={false} />)
  .add('ATTENTION', () => <Button type={2} text="ATTENTION" hasIcon={false} />)
  .add('WITH ICON', () => <Button type={0} text="WITH ICON" hasIcon />);
