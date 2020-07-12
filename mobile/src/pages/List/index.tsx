import React, { useEffect, useState } from 'react';

import api from '@services/api';

import * as S from './styles';

export interface Gateway {
  id: string;
  location: string;
  createdAt: string;
}

export interface Endnode {
  id: string;
  name: string;
  room: string;
}

const List: React.FC = () => {
  const [gateways, setGateways] = useState<Gateway[]>([]);
  const [endnodes, setEndnodes] = useState<Endnode[]>([]);

  useEffect(() => {
    async function loadDevices(): Promise<void> {
      const result = await Promise.all([
        api.get<Gateway[]>('gateways'),
        api.get<Endnode[]>('endnodes'),
      ]);

      setGateways(result[0].data);
      setEndnodes(result[1].data);
    }

    loadDevices();
  }, []);

  return (
    <S.Container>
      <S.Content>
        <S.Title>Gateways</S.Title>
        <S.GatewayList
          data={gateways}
          keyExtractor={(gateway) => gateway.id}
          renderItem={({ item }) => (
            <S.VerticalCard
              iconName="gateway"
              title={item.location}
              subTitle={item.createdAt}
            />
          )}
        />

        <S.Title>End-nodes</S.Title>
        <S.EndnodeList
          data={endnodes}
          keyExtractor={(endnode) => endnode.id}
          renderItem={({ item }) => (
            <S.VerticalCard
              iconName="endnode"
              title={item.name}
              subTitle={item.room}
            />
          )}
        />
      </S.Content>
    </S.Container>
  );
};

export default List;
