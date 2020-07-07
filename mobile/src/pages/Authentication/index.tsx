import React, { useState, useRef, useEffect } from 'react';
import { TextInput, Keyboard } from 'react-native';

import { FormHandles } from '@unform/core';

import Logo from '@atoms/Logo';

import connerImg from '@assets/default/conner.png';

import * as S from './styles';

const Authentication: React.FC = () => {
  const [isSignUp, setIsSingUp] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  useEffect(() => {
    Keyboard.dismiss();
  }, [isSignUp]);

  function toggleSignUp(): void {
    setIsSingUp((state) => !state);
  }

  function handleSubmit(): void {
    console.log('submit');
  }

  function handleOnPress(): void {
    formRef.current?.submitForm();
  }

  return (
    <S.Container>
      <S.Background>
        <S.TopConner source={connerImg} />
        <S.ButtonConner source={connerImg} />
      </S.Background>

      <Logo size={100} />
      <S.Title>Owlify</S.Title>

      <S.AuthForm onSubmit={handleSubmit}>
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
          placeholder="E-mail"
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
    </S.Container>
  );
};

export default Authentication;
