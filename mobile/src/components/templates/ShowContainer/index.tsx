import React from 'react';
import { View, TouchableOpacity, GestureResponderEvent } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import Icon from '@atoms/Icon';

import * as S from './styles';

interface ShowContainerProps {
  handleEdit: (event: GestureResponderEvent) => void;
  handleDelete: (event: GestureResponderEvent) => void;
  header: {
    title: string;
    subTitle?: string;
    description: string;
    iconName: string;
  };
}

const ShowContainer: React.FC<ShowContainerProps> = ({
  header,
  children,
  handleEdit,
  handleDelete,
}) => {
  const { goBack } = useNavigation();

  return (
    <S.Container>
      <S.Header>
        <TouchableOpacity onPress={goBack}>
          <S.Icon name="chevron-left" size={24} />
        </TouchableOpacity>

        <S.HeaderContent>
          <Icon name={header.iconName} color="light" />

          <S.HeaderTextContainer>
            <S.HeaderTitle>{header.title}</S.HeaderTitle>
            {header.subTitle && (
              <S.HeaderTitle>{header.subTitle}</S.HeaderTitle>
            )}
            <S.HeaderDescription>{header.description}</S.HeaderDescription>
          </S.HeaderTextContainer>

          <View>
            <TouchableOpacity onPress={handleEdit}>
              <S.Icon size={24} name="edit-3" style={{ marginBottom: 24 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <S.Icon size={24} name="trash-2" />
            </TouchableOpacity>
          </View>
        </S.HeaderContent>
      </S.Header>

      <S.ScrollView>{children}</S.ScrollView>
    </S.Container>
  );
};

export default ShowContainer;
