import React from 'react';

import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

const NoEndnodeCard: React.FC = () => {
  const { navigate } = useNavigation();

  function NavigateToEndnodeRegistration(): void {
    navigate('Registration', { screen: 'SelectGateway' });
  }

  return (
    <S.Container>
      <S.Description>
        {"You don't have any end-nodes registered. "}
        <S.Strong>Would like to register one?</S.Strong>
      </S.Description>

      <S.Button text="Register" onPress={NavigateToEndnodeRegistration} />
    </S.Container>
  );
};

export default NoEndnodeCard;
