import 'react-native-gesture-handler';

import React from 'react';

import * as S from './styles';

interface CardProps {
  title: string;
  subTitle: string;
  isVertical?: boolean;
  Icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ isVertical, Icon, title, subTitle }) => {
  return (
    <S.Container isVertical={isVertical}>
      <>
        {Icon}
        <S.Content isCentered={isVertical}>
          <S.Title>{title}</S.Title>
          <S.SubTitle>{subTitle}</S.SubTitle>
        </S.Content>
      </>
    </S.Container>
  );
};

export default Card;
