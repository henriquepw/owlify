import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { TextInput, TextInputProps, StyleProp, ViewStyle } from 'react-native';

import { useField } from '@unform/core';

import * as S from './styles';

interface InputProps extends TextInputProps {
  icon?: string;
  name: string;
  containerStyle?: StyleProp<ViewStyle>;
}

interface InputRef {
  focus(): void;
}

interface InputValueRef {
  value: string;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  { name, icon, containerStyle = {}, ...rest },
  ref,
) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputElementRef = useRef<TextInput>(null);
  const inputValueRef = useRef<InputValueRef>({ value: defaultValue });

  const [isFilled, setIsFilled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current?.focus();
    },
  }));

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

  function setInputValue(value: string): void {
    inputValueRef.current.value = value;
  }

  function handleFocus(): void {
    !isFocused && setIsFocused(true);
  }

  function handleBlur(): void {
    isFocused && setIsFocused(false);

    if (!!inputValueRef.current.value !== isFilled) {
      setIsFilled(!!inputValueRef.current.value);
    }
  }
  return (
    <S.Container style={containerStyle}>
      <S.Content isFocused={isFocused} isFilled={isFilled} isErrored={!!error}>
        {icon && (
          <S.InputIcon
            name={icon}
            size={24}
            isErrored={!!error}
            isFilled={isFilled}
          />
        )}
        <S.TextInput
          ref={inputElementRef}
          keyboardAppearance="light"
          defaultValue={defaultValue}
          onChangeText={setInputValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...rest}
        />
      </S.Content>
      {!!error && <S.TextError>{error}</S.TextError>}
    </S.Container>
  );
};

export default forwardRef(Input);
