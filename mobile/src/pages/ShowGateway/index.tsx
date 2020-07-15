import React, { useMemo, useCallback } from 'react';
import { Text, Alert } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import api from '@services/api';
import { format, parseISO } from 'date-fns';
import { trigger, mutate } from 'swr';

import ShowContainer from '@templates/ShowContainer';

import { useDevices } from '@hooks';

// import * as S from './styles';

interface RouteParams {
  gateway: {
    id: string;
    location: string;
    updatedAt: string;
  };
}

const ShowGateway: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { gateway } = route.params as RouteParams;
  const { gateways } = useDevices();

  const formattedUpdatedAt = useMemo(
    () => `Updated at ${format(parseISO(gateway.updatedAt), 'dd/MM/yyyy')}`,
    [gateway.updatedAt],
  );

  // TODO: edit the gateway data
  function handleEdit(): void {
    console.log('Edit');
  }

  const handleDelete = useCallback(() => {
    async function deleteGateway(): Promise<void> {
      mutate(
        '/gateways',
        gateways.filter((current) => current.id !== gateway.id),
      );

      await api.delete(`/gateways/${gateway.id}`);

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
        },
      ],
    );
  }, [gateway.id, navigation]);

  return (
    <ShowContainer
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      header={{
        iconName: 'gateway',
        title: gateway.location,
        description: formattedUpdatedAt,
      }}
    >
      <Text>Fimmmmm</Text>
    </ShowContainer>
  );
};

export default ShowGateway;
