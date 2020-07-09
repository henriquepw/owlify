import React from 'react';

import { useNavigation, TabActions } from '@react-navigation/native';

import Button from '@atoms/Button';
import Icon from '@atoms/Icon';

import * as S from './styles';

const GatewayRegistration: React.FC = () => {
  const navigation = useNavigation();

  function handleRegistration(): void {
    const jumpToAction = TabActions.jumpTo('dashboard');

    navigation.dispatch(jumpToAction);
  }

  return (
    <S.Container>
      <S.ScrollContainer>
        <Icon name="gateway" background={false} size={100} />
        <S.Title>Gateway</S.Title>

        <S.RegistrationForm onSubmit={handleRegistration}>
          <S.Input name="location" icon="map-pin" placeholder="Location" />

          <Button text="Register" onPress={handleRegistration} />
        </S.RegistrationForm>
      </S.ScrollContainer>
    </S.Container>
  );
};

export default GatewayRegistration;
