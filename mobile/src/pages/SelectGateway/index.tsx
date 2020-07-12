import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import api from '@services/api';

import Button from '@atoms/Button';

import backgroundImg from '@assets/default/endnode-registration-background.png';

import * as S from './styles';

export interface Gateway {
  id: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

const SelectGateway: React.FC = () => {
  const navigation = useNavigation();

  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);

  useEffect(() => {
    async function loadGateways(): Promise<void> {
      const response = await api.get<Gateway[]>('gateways');

      setGateways(response.data);
    }

    loadGateways();
  }, []);

  function navigateToEndnodeRegistration(): void {
    navigation.navigate('EndnodeRegistration', {
      gatewayId: selectedGateway,
    });
  }

  return (
    <S.Container>
      <S.Background source={backgroundImg} />

      <S.List
        data={gateways}
        keyExtractor={(gateway) => gateway.id}
        renderItem={({ item }) => (
          <S.Card
            iconName="gateway"
            title={item.location}
            subTitle={item.createdAt}
            isSelected={selectedGateway === item.id}
            onPress={() => setSelectedGateway(item.id)}
          />
        )}
      />

      <S.ButtonContainer>
        <Button
          text="next"
          enabled={!!selectedGateway}
          onPress={navigateToEndnodeRegistration}
        />
      </S.ButtonContainer>
    </S.Container>
  );
};

export default SelectGateway;
