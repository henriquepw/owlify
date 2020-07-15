import React, { useMemo } from 'react';
import { Text } from 'react-native';

import { useRoute } from '@react-navigation/native';
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
  const route = useRoute();

  const { gateway } = route.params as RouteParams;

  const formattedUpdatedAt = useMemo(
    () => `Updated at ${format(parseISO(gateway.updatedAt), 'dd/MM/yyyy')}`,
    [gateway.updatedAt],
  );

  function handleEdit(): void {
    console.log('Edit');
  }

  function handleDelete(): void {
    console.log('Delete');
  }

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
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>Quase</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>{gateway.location}</Text>
      <Text>Fimmmmm</Text>
    </ShowContainer>
  );
};

export default ShowGateway;
