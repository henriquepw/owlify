import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TextInput, Keyboard, Alert } from 'react-native';

import api from '@services/api';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Logo from '@atoms/Logo';

import { useAuth } from '@hooks/auth';

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
  const { signIn } = useAuth();

  // Using for the transaction between sign in and sign up
  const [isSignUp, setIsSingUp] = useState(false);

  // Using for controller the logo visibility
  const [isKeyboardHidden, setIsKeyboardHidden] = useState(true);

  const formRef = useRef<FormHandles>(null);
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  // Create listerners for keyboard
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

  // Remove the focus on any input when toggle isSignUp variable
  useEffect(() => {
    Keyboard.dismiss();
  }, [isSignUp]);

  function toggleSignUp(): void {
    setIsSingUp((state) => !state);
  }

  function handleOnPress(): void {
    formRef.current?.submitForm();
  }

  function setEmailInputFocus(): void {
    emailInputRef.current?.focus();
  }

  function setPasswordInputFocus(): void {
    passwordInputRef.current?.focus();
  }

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        // Validation of the inputs
        const validationSchema = Object.assign(
          signInSchema,
          isSignUp
            ? {
                name: Yup.string().required('The name is required'),
              }
            : {},
        );

        const schema = Yup.object().shape(validationSchema);

        await schema.validate(data, {
          abortEarly: false,
        });

        formRef.current?.setErrors({});

        // Register the user on server
        if (isSignUp) {
          await api.post('/users', data);

          // display a sucess alert
          Alert.alert('Success!', 'You registered with success :D', [
            {
              text: 'Ok',
              onPress: () => setIsSingUp(false), // navigate to signIn
            },
          ]);

          return;
        }

        signIn({
          email: data.email,
          password: data.password,
        });
        // Alert.alert('Success!', 'You successfully logged in :D');
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);

          return;
        }

        // If not a Validation error, probaly is a request error
        // display a alery with the error
        Alert.alert('Something went wrong :(!', 'Try again later');

        // console.log('Deu ruim', JSON.stringify(error));
      }
    },
    [isSignUp, signIn],
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
              onSubmitEditing={setEmailInputFocus}
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
            onSubmitEditing={setPasswordInputFocus}
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
