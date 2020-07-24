import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import api from '@services/api';
import { format, parseISO } from 'date-fns';

import Button from '@atoms/Button';

import { Gateway } from '@utils/interfaces';

import backgroundImg from '@assets/default/endnode-registration-background.png';

import * as S from './styles';

const SelectGateway: React.FC = () => {
  const navigation = useNavigation();

  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);

  useEffect(() => {
    async function loadGateways(): Promise<void> {
      const response = await api.get<Gateway[]>('gateways');

      setGateways(
        response.data.map(gateway => ({
          ...gateway,
          createdAt: `Created at ${format(
            parseISO(gateway.createdAt),
            'dd/MM/yyyy',
          )}`,
        })),
      );
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
      <S.BackgroundContainer>
        <S.BackgroundImage source={backgroundImg} />
      </S.BackgroundContainer>

      <S.List
        data={gateways}
        keyExtractor={gateway => gateway.id}
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
