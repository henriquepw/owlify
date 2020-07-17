import React, { useState, useMemo, useCallback } from 'react';
import { Alert } from 'react-native';

import { useRoute, useNavigation } from '@react-navigation/native';
import api from '@services/api';
import { format, parseISO } from 'date-fns';
import { trigger } from 'swr';

import ShowContainer from '@templates/ShowContainer';

import { Endnode } from '@utils/interfaces';

import * as S from './styles';

interface RouteParams {
  endnode: Endnode;
}

const ShowEndnode: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { endnode } = route.params as RouteParams;

  const [isModalVisible, setModalVisible] = useState(false);

  const formattedUpdatedAt = useMemo(
    () => `Updated at ${format(parseISO(endnode.updatedAt), 'dd/MM/yyyy')}`,
    [endnode.updatedAt],
  );

  function toggleModalVisible(): void {
    setModalVisible(!isModalVisible);
  }

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

  return (
    <>
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
        <S.SessionTitle>Gateway</S.SessionTitle>
      </ShowContainer>
    </>
  );
};

export default ShowEndnode;