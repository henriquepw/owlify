import React, { useState } from 'react';

import Logo from '@atoms/Logo';

import connerImg from '@assets/default/conner.png';

import * as S from './styles';

const Authentication: React.FC = () => {
  const [isSignUp, setIsSingUp] = useState(false);

  function toggleSignUp(): void {
    setIsSingUp((state) => !state);
  }

  function handleSubmit(): void {
    console.log('submit');
  }

  return (
    <S.Container>
      <S.TopConner source={connerImg} />
      <S.ButtonConner source={connerImg} />

      <Logo size={100} />
      <S.Title>Owlify</S.Title>

      <S.AuthForm onSubmit={handleSubmit}>
        {isSignUp && <S.Input name="name" placeholder="Name" icon="user" />}

        <S.Input name="email" placeholder="E-mail" icon="mail" />
        <S.Input
          name="password"
          placeholder="Password"
          icon="lock"
          secureTextEntry
        />

        <S.SubmitButton text={`Sign ${isSignUp ? 'up' : 'in'}`} />
      </S.AuthForm>

      <S.NoAccountText>
        {isSignUp ? 'Have an account ?' : "Don't have an account yet?"}
      </S.NoAccountText>
      <S.ToggleSign onPress={toggleSignUp}>
        <S.ToggleSignText>{`Sign ${!isSignUp ? 'up' : 'in'}`}</S.ToggleSignText>
      </S.ToggleSign>
    </S.Container>
  );
};

export default Authentication;