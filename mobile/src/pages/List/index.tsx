import React, { useEffect, useState } from 'react';

import api from '@services/api';
import { parseISO, format } from 'date-fns';

import TabFragment from '@templates/TabFragment';

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

      setEndnodes(result[1].data);
      setGateways(
        result[0].data.map((gateway) => ({
          ...gateway,
          createdAt: `Created at ${format(
            parseISO(gateway.createdAt),
            'dd/MM/yyyy',
          )}`,
        })),
      );
    }

    loadDevices();
  }, []);

  return (
    <TabFragment title="Your devices">
      <S.SessionTitle>Gateways</S.SessionTitle>
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

      <S.SessionTitle>End-nodes</S.SessionTitle>
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

      <S.SessionTitle>End-nodes</S.SessionTitle>
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
    </TabFragment>
  );
};

export default List;
