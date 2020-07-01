import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Button from '@atoms/Button';

storiesOf('Button', module)
  .add('Default', () => <Button text="default" />)
  .add('Disabled', () => <Button text="disabled" enabled={false} />)
  .add('Attention', () => <Button type="attention" text="attention" />)
  .add('With icon', () => <Button text="with icon" icon="gateway" />);
