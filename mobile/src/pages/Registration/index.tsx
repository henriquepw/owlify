import React from 'react';

import { useNavigation } from '@react-navigation/native';

import Button from '@atoms/Button';

import * as S from './styles';

const Registration: React.FC = () => {
  const navigation = useNavigation();

  function navigateToGatewayRegistration(): void {
    navigation.navigate('GatewayRegistration');
  }

  return (
    <S.Container>
      <Button
        icon="gateway"
        text="gateway"
        onPress={navigateToGatewayRegistration}
      />
      <S.DividerContainer>
        <S.Divider />
        <S.DividerText>or</S.DividerText>
        <S.Divider />
      </S.DividerContainer>
      <Button icon="endnode" text="end-node" />
    </S.Container>
  );
};

export default Registration;
