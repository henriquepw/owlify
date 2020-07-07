import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TextInput, Keyboard } from 'react-native';

import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Logo from '@atoms/Logo';

import getValidationErrors from '@utils/getValidationErrors';

import connerImg from '@assets/default/conner.png';

import * as S from './styles';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const signInSchema = {
  email: Yup.string()
    .required('The email is required')
    .email('Enter a valid email address'),
  password: Yup.string().min(6, 'At least 6 character'),
};

const Authentication: React.FC = () => {
  const [isSignUp, setIsSingUp] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [isKeyboardHidden, setIsKeyboardHidden] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setIsKeyboardHidden(false),
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setIsKeyboardHidden(true),
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    Keyboard.dismiss();
  }, [isSignUp]);

  function toggleSignUp(): void {
    setIsSingUp((state) => !state);
  }

  function handleOnPress(): void {
    formRef.current?.submitForm();
  }

  const handleSubmit = useCallback(
    async (data: FormData) => {
      console.log('submit', data);

      try {
        const schemaData = Object.assign(
          signInSchema,
          isSignUp
            ? {
                name: Yup.string().required('The name is required'),
              }
            : {},
        );

        const schema = Yup.object().shape(schemaData);

        await schema.validate(data, {
          abortEarly: false,
        });

        formRef.current?.setErrors({});
      } catch (error) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);
      }
    },
    [isSignUp],
  );

  return (
    <S.Container>
      <S.ScrollForm>
        {isKeyboardHidden && <Logo size={100} />}
        <S.Title>Owlify</S.Title>

        <S.AuthForm ref={formRef} onSubmit={handleSubmit}>
          {isSignUp && (
            <S.Input
              ref={nameInputRef}
              icon="user"
              name="name"
              placeholder="Name"
              autoCapitalize="words"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />
          )}

          <S.Input
            ref={emailInputRef}
            icon="mail"
            name="email"
            placeholder="Email"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => passwordInputRef.current?.focus()}
          />

          <S.Input
            ref={passwordInputRef}
            icon="lock"
            name="password"
            placeholder="Password"
            returnKeyType="send"
            onSubmitEditing={handleOnPress}
            secureTextEntry
          />

          <S.SubmitButton
            onPress={handleOnPress}
            text={`Sign ${isSignUp ? 'up' : 'in'}`}
          />
        </S.AuthForm>
      </S.ScrollForm>

      <S.Background>
        <S.TopConner source={connerImg} />
        <S.ButtonConner source={connerImg} />

        <S.ToggleSignView>
          <S.ToggleSignText>
            {isSignUp ? 'Have an account ?' : "Don't have an account yet?"}
          </S.ToggleSignText>

          <S.ToggleSignButton onPress={toggleSignUp}>
            <S.ToggleSignButtonText>
              {`Sign ${!isSignUp ? 'up' : 'in'}`}
            </S.ToggleSignButtonText>

            <S.ToggleSignButtonBorder />
          </S.ToggleSignButton>
        </S.ToggleSignView>
      </S.Background>
    </S.Container>
  );
};

export default Authentication;
