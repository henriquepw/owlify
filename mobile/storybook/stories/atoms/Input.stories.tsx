import React from 'react';

import { storiesOf } from '@storybook/react-native';
import { Form } from '@unform/mobile';

import Input from '../../../src/components/atoms/Input';

interface Props {
  text: string;
}

storiesOf('Input', module).add('default', () => (
  <Form onSubmit={() => {}}>
    <Input icon="mail" name="email" placeholder="E-mail" />
  </Form>
));
