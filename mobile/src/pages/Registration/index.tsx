import React from 'react';

import { useNavigation } from '@react-navigation/native';

import Button from '@atoms/Button';

import backgroundImg from '@assets/default/registration-background.png';

import * as S from './styles';

const iconProps = {
  background: false,
};

const Registration: React.FC = () => {
  const navigation = useNavigation();

  function navigateToGatewayRegistration(): void {
    navigation.navigate('GatewayRegistration');
  }

  function navigateToSelectGateway(): void {
    navigation.navigate('SelectGateway');
  }

  return (
    <S.Container>
      <S.Background source={backgroundImg} />

      <Button
        icon="gateway"
        text="gateway"
        iconProps={iconProps}
        onPress={navigateToGatewayRegistration}
      />

      <S.DividerContainer>
        <S.Divider />
        <S.DividerText>or</S.DividerText>
        <S.Divider />
      </S.DividerContainer>

      <Button
        icon="endnode"
        text="end-node"
        iconProps={iconProps}
        onPress={navigateToSelectGateway}
      />
    </S.Container>
  );
};

export default Registration;
