import React, { useState, useMemo, useCallback } from 'react';
import { Alert } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import api from '@services/api';
import { format, parseISO } from 'date-fns';
import { trigger } from 'swr';

import EditEndnodeModal from '@organisms/EditEndnodeModal';

import ShowContainer from '@templates/ShowContainer';

import { useDevices } from '@hooks';

import { Endnode } from '@utils/interfaces';

import * as S from './styles';

interface RouteParams {
  endnode: Endnode;
}

const ShowEndnode: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { endnode } = route.params as RouteParams;
  const { gateways } = useDevices();

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
        <S.Graphic />
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
