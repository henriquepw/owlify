import React, { useEffect, useState } from 'react';

import api from '@services/api';

import Button from '@atoms/Button';

import * as S from './styles';

export interface Gateway {
  id: string;
  location: string;
  createdAt: string;
  updatedAt: string;
}

const SelectGateway: React.FC = () => {
  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [selectedGateway, setSelectedGateway] = useState<string | null>(null);

  useEffect(() => {
    async function loadGateways(): Promise<void> {
      const response = await api.get<Gateway[]>('gateways');

      setGateways(response.data);
    }

    loadGateways();
  }, []);

  return (
    <S.Container>
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
        <Button enabled={!!selectedGateway} text="next" />
      </S.ButtonContainer>
    </S.Container>
  );
};

export default SelectGateway;
