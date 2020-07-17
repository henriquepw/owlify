import React, { useMemo } from 'react';
import { Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { parseISO, format } from 'date-fns';

import EmplyList from '@organisms/EmplyList';
import EndnodeList from '@organisms/EndnodesList';

import TabFragment from '@templates/TabFragment';

import { useDevices } from '@hooks';

import * as S from './styles';

const List: React.FC = () => {
  const navigation = useNavigation();

  const {
    gateways,
    endnodes,
    isGatewaysLoading,
    isEndnodesLoading,
  } = useDevices();

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

  if (gateways.length === 0) {
    return (
      <TabFragment title="Your devices">
        <EmplyList />
      </TabFragment>
    );
  }

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
        <EndnodeList data={endnodes} />
      ) : (
        <Text>Loading...</Text>
      )}
    </TabFragment>
  );
};

export default List;
