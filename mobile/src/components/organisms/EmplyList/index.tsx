import React from 'react';
import { Image } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import noDataImg from '@assets/default/no-data.png';

import * as S from './styles';

const EmplyList: React.FC = () => {
  const { navigate } = useNavigation();

  function navigateToGatewayRegistration(): void {
    navigate('Registration', { screen: 'GatewayRegistration' });
  }

  return (
    <S.Container>
      <Image source={noDataImg} />
      <S.Title>Is emply!</S.Title>
      <S.Description>
        {"You don't have any devices registered. "}
        <S.Strong>Would like to register a gateway?</S.Strong>
      </S.Description>

      <S.Button text="Register" onPress={navigateToGatewayRegistration} />
    </S.Container>
  );
};

export default EmplyList;
