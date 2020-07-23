import React from 'react';
import { Button } from 'react-native';

import { useRef, useEffect, useState } from '@storybook/addons';
import { storiesOf } from '@storybook/react-native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import Input from '@atoms/Input';

const onSubmit = (): string => '';

storiesOf('Input', module)
  .add('With Icon', () => (
    <Form onSubmit={onSubmit}>
      <Input icon="mail" name="withIcon" placeholder="With Icon" />
    </Form>
  ))
  .add('Without Icon', () => (
    <Form onSubmit={onSubmit}>
      <Input name="withoutIcon" placeholder="Without Icon" />
    </Form>
  ))
  .add('With Error', () => {
    const formRef = useRef<FormHandles>({} as FormHandles);
    const [isErrored, setIsErrored] = useState(true);

    useEffect(() => {
      formRef.current?.setFieldError(
        'email',
        isErrored ? 'E-mail is required' : '',
      );
    }, [formRef, isErrored]);

    function toogleError(): void {
      setIsErrored((state) => !state);
    }

    return (
      <Form onSubmit={onSubmit} ref={formRef}>
        <Input
          icon="mail"
          name="email"
          placeholder="E-mail"
          containerStyle={{ marginBottom: 40 }}
        />

        <Button onPress={toogleError} title="Toggle Error" />
      </Form>
    );
  });
