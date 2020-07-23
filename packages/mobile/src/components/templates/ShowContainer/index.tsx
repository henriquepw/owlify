import React from 'react';
import {
  View,
  TouchableOpacity,
  GestureResponderEvent,
  Animated,
} from 'react-native';

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

const HEADER_HEIGHT = 224;

const interpolate = {
  inputRange: [0, HEADER_HEIGHT],
  extrapolate: 'clamp',
} as Animated.InterpolationConfigType;

const ShowContainer: React.FC<ShowContainerProps> = ({
  header,
  children,
  handleEdit,
  handleDelete,
}) => {
  const { goBack } = useNavigation();

  const scrollY = new Animated.Value(0);

  const headerY = scrollY.interpolate({
    ...interpolate,
    outputRange: [0, -HEADER_HEIGHT],
  });

  const headerContentY = scrollY.interpolate({
    ...interpolate,
    outputRange: [0, HEADER_HEIGHT],
  });

  const headerContentOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT / 3],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <S.Container>
      <S.Header
        style={{
          transform: [{ translateY: headerY }],
        }}
      >
        <Animated.View
          style={{
            transform: [{ translateY: headerContentY }],
            opacity: headerContentOpacity,
          }}
        >
          <TouchableOpacity onPress={goBack} style={{ marginLeft: 24 }}>
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
        </Animated.View>

        <S.HeaderFooter>
          <S.HeaderPuller />
        </S.HeaderFooter>
      </S.Header>

      <S.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
      >
        {children}
      </S.ScrollView>
    </S.Container>
  );
};

export default ShowContainer;
