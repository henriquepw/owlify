import React, { useState, useMemo, useCallback } from 'react';
import { Alert } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import api from '@services/api';
import { format, parseISO } from 'date-fns';
import { trigger } from 'swr';

import LineGraph from '@molecules/LineGraph';

import EditEndnodeModal from '@organisms/EditEndnodeModal';

import ShowContainer from '@templates/ShowContainer';

import { useDevices, useGet } from '@hooks';

import { Endnode, SensorsData } from '@utils/interfaces';

import * as S from './styles';

interface RouteParams {
  endnode: Endnode;
}

interface FormattedData {
  temperature: number[];
  humidity: number[];
}

const ShowEndnode: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { endnode } = route.params as RouteParams;
  const { gateways } = useDevices();

  const [sensorsData] = useGet<SensorsData[]>(
    `/sensors/${endnode.id}?all=true`,
  );

  const currentGateway = useMemo(() => {
    const findGateway = gateways.find(
      (gateway) => gateway.id === endnode.gatewayId,
    );

    if (!findGateway) return findGateway;

    return {
      ...findGateway,
      createdAt: `Created at ${format(
        parseISO(findGateway.createdAt),
        'dd/MM/yyyy',
      )}`,
    };
  }, [gateways, endnode.gatewayId]);

  const [isModalVisible, setModalVisible] = useState(false);

  const formattedUpdatedAt = useMemo(
    () => `Updated at ${format(parseISO(endnode.updatedAt), 'dd/MM/yyyy')}`,
    [endnode.updatedAt],
  );

  const handleDelete = useCallback(() => {
    async function deleteEndnode(): Promise<void> {
      await api.delete(`/endnodes/${endnode.id}`);

      trigger('/endnodes');

      navigation.goBack();
    }

    Alert.alert(
      'Attention! Are you sure about that?',
      'You are about to delete the end-node.',
      [
        {
          text: 'Delete',
          onPress: deleteEndnode,
          style: 'destructive',
        },
        {
          text: 'Cancel',
        },
      ],
    );
  }, [navigation, endnode.id]);

  function toggleModalVisible(): void {
    setModalVisible(!isModalVisible);
  }

  function navigateToCurrentGatewayDetail(): void {
    navigation.navigate('ShowGateway', { gateway: currentGateway });
  }

  const formattedData = useMemo(
    () =>
      sensorsData?.reduce<FormattedData>(
        (result, currentData) => ({
          temperature: [...result.temperature, currentData.temperature],
          humidity: [...result.humidity, currentData.humidity],
        }),
        { temperature: [], humidity: [] },
      ),
    [sensorsData],
  );

  return (
    <>
      <EditEndnodeModal
        endnode={endnode}
        isVisible={isModalVisible}
        onCancel={toggleModalVisible}
      />
      <ShowContainer
        handleEdit={toggleModalVisible}
        handleDelete={handleDelete}
        header={{
          iconName: 'endnode',
          title: endnode.name,
          subTitle: endnode.room,
          description: formattedUpdatedAt,
        }}
      >
        <S.SessionTitle>Temperature</S.SessionTitle>
        <LineGraph data={formattedData?.temperature || []} />

        <S.SessionTitle>Humidity</S.SessionTitle>
        <LineGraph data={formattedData?.humidity || []} />

        {currentGateway && (
          <>
            <S.SessionTitle>Gateway</S.SessionTitle>
            <S.Card
              iconName="gateway"
              title={currentGateway.location}
              subTitle={currentGateway.createdAt}
              onPress={navigateToCurrentGatewayDetail}
            />
          </>
        )}
      </ShowContainer>
    </>
  );
};

export default ShowEndnode;
