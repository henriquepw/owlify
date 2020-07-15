import React, { useMemo } from 'react';
import { Text, Alert } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import api from '@services/api';
import { useCallback } from '@storybook/addons';
import { format, parseISO } from 'date-fns';

import ShowContainer from '@templates/ShowContainer';

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

  const formattedUpdatedAt = useMemo(
    () => `Updated at ${format(parseISO(gateway.updatedAt), 'dd/MM/yyyy')}`,
    [gateway.updatedAt],
  );

  function handleEdit(): void {
    console.log('Edit');
  }

  const handleDelete = useCallback(() => {
    async function deleteGateway(): Promise<void> {
      await api.delete(`/gateways/${gateway.id}`);

      navigation.navigate('Home', { screen: 'Dashboard' });
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
