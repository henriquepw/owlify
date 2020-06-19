import React, {
  forwardRef,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { useField } from '@unform/core';

import * as S from './styles';

interface InputProps extends TextInputProps {
  icon?: string;
  name: string;
}

interface InputRef {
  focus(): void;
}

interface InputValueRef {
  value: string;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputElementRef = useRef<TextInput>(null);
  const inputValueRef = useRef<InputValueRef>({ value: defaultValue });

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus();
    },
  }));

  function setInputValue(value: string): void {
    inputValueRef.current.value = value;
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current?.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current?.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <S.Container>
      <S.Content>
        {icon && <S.InputIcon name={icon} size={24} />}
        <S.TextInput
          ref={inputElementRef}
          keyboardAppearance="light"
          defaultValue={defaultValue}
          onChangeText={setInputValue}
          {...rest}
        />
      </S.Content>
      {error && <S.TextError>{error}</S.TextError>}
    </S.Container>
  );
};

export default forwardRef(Input);
