import React, { useMemo } from 'react';
import { Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { parseISO, format } from 'date-fns';

import TabFragment from '@templates/TabFragment';

import { useGet } from '@hooks';

import { Gateway, Endnode } from '@utils/interfaces';

import * as S from './styles';

const List: React.FC = () => {
  const navigation = useNavigation();

  const [gateways, isGatewaysLoading] = useGet<Gateway[]>('/gateways');
  const [endnodes, isEndnodesLoading] = useGet<Endnode[]>('/endnodes');

  const formattedGateway = useMemo(
    () =>
      gateways?.map((gateway) => ({
        ...gateway,
        createdAt: `Created at ${format(
          parseISO(gateway.createdAt),
          'dd/MM/yyyy',
        )}`,
      })),
    [gateways],
  );

  return (
    <TabFragment title="Your devices">
      <S.SessionTitle style={{ marginTop: 24 }}>Gateways</S.SessionTitle>
      {isGatewaysLoading ? (
        <S.GatewayList
          data={formattedGateway}
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
      ) : (
        <Text>Loading...</Text>
      )}

      <S.SessionTitle>End-nodes</S.SessionTitle>
      {isEndnodesLoading ? (
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
      ) : (
        <Text>Loading...</Text>
      )}
    </TabFragment>
  );
};

export default List;
