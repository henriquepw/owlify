import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import api from '@services/api';
import { parseISO, format } from 'date-fns';

import TabFragment from '@templates/TabFragment';

import { Gateway, Endnode } from '@utils/interfaces';

import * as S from './styles';

const List: React.FC = () => {
  const navigation = useNavigation();

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
      <S.SessionTitle style={{ marginTop: 24 }}>Gateways</S.SessionTitle>
      <S.GatewayList
        data={gateways}
        keyExtractor={(gateway) => gateway.id}
        renderItem={({ item }) => (
          <S.VerticalCard
            iconName="gateway"
            title={item.location}
            subTitle={item.createdAt}
            onPress={() => {
              navigation.navigate('ShowGateway', { gateway: item });
            }}
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
