import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Alert } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import api from '@services/api';
import { format, parseISO } from 'date-fns';
import { trigger, mutate } from 'swr';

import LineGraph from '@molecules/LineGraph';

import EditGatewayModal from '@organisms/EditGatewayModal';
import EndnodesList from '@organisms/EndnodesList';

import ShowContainer from '@templates/ShowContainer';

import { useDevices, useGet } from '@hooks';

import { Endnode, Gateway, SensorsData } from '@utils/interfaces';

import * as S from './styles';

interface RouteParams {
  gateway: Gateway;
}

interface FormattedData {
  temperature: number[];
  humidity: number[];
}

const ShowGateway: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { gateway } = route.params as RouteParams;

  // const getGateway = useGet<Gateway>(`/gateways/${routeParams.gateway.id}`, {
  //   initialData: routeParams.gateway,
  // });

  // const gateway = getGateway[0] as Gateway;

  const [endnodes] = useGet<Endnode[]>(`/endnodes/gateway/${gateway.id}`);
  const { gateways } = useDevices();

  const [isModalVisible, setModalVisible] = useState(false);
  const [sensorsData, setSensorsData] = useState<FormattedData>({
    temperature: [],
    humidity: [],
  });

  const formattedUpdatedAt = useMemo(
    () => `Updated at ${format(parseISO(gateway.updatedAt), 'dd/MM/yyyy')}`,
    [gateway.updatedAt],
  );

  const handleDelete = useCallback(() => {
    async function deleteGateway(): Promise<void> {
      mutate(
        '/gateways',
        gateways.filter(current => current.id !== gateway?.id),
      );

      await api.delete(`/gateways/${gateway?.id}`);

      trigger('/gateways');

      navigation.goBack();
    }

    Alert.alert(
      'Attention! Are you sure about that?',
      'You are about to delete the gateway, by deleting it, all end-nodes linked will also be deleted.',
      [
        {
          text: 'Delete',
          onPress: deleteGateway,
          style: 'destructive',
        },
        { text: 'Cancel' },
      ],
    );
  }, [navigation, gateways, gateway?.id]);

  useEffect(() => {
    async function loadSensorsData(): Promise<void> {
      if (endnodes) {
        const endnodesSensorsData = await Promise.all(
          endnodes.map(node =>
            api.get<SensorsData[]>(`/sensors/${node.id}?all=true`),
          ),
        );

        const reduceredSensorsData = endnodesSensorsData.reduce<SensorsData[]>(
          (result, current) => [...result, ...current.data],
          [],
        );

        const formattedSensorsData = reduceredSensorsData?.reduce<
          FormattedData
        >(
          (result, currentData) => ({
            temperature: [...result.temperature, currentData.temperature],
            humidity: [...result.humidity, currentData.humidity],
          }),
          { temperature: [], humidity: [] },
        );

        setSensorsData(formattedSensorsData);
      }
    }

    loadSensorsData();
  }, [endnodes]);

  function toggleModalVisible(): void {
    setModalVisible(!isModalVisible);
  }

  return (
    <>
      <EditGatewayModal
        gateway={gateway}
        isVisible={isModalVisible}
        onCancel={toggleModalVisible}
      />

      <ShowContainer
        handleEdit={toggleModalVisible}
        handleDelete={handleDelete}
        header={{
          iconName: 'gateway',
          title: gateway.location,
          description: formattedUpdatedAt,
        }}
      >
        <S.SessionTitle>Temperature</S.SessionTitle>
        <LineGraph data={sensorsData.temperature} />

        <S.SessionTitle>Humidity</S.SessionTitle>
        <LineGraph data={sensorsData.humidity} />

        <S.SessionTitle>End-nodes</S.SessionTitle>
        <EndnodesList data={endnodes || []} />
      </ShowContainer>
    </>
  );
};

export default ShowGateway;
