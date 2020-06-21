import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import * as S from './styles';

interface CardProps extends RectButtonProperties {
  title: string;
  subTitle: string;
  isSelected?: boolean;
  isVertical?: boolean;
  Icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  isVertical,
  isSelected,
  Icon,
  title,
  subTitle,
  ...rest
}) => {
  return (
    <S.Container isVertical={isVertical} {...rest}>
      <S.Content isVertical={isVertical} isSelected={isSelected}>
        {Icon}
        <S.TextWrapper isCentered={isVertical}>
          <S.Title>{title}</S.Title>
          <S.SubTitle>{subTitle}</S.SubTitle>
        </S.TextWrapper>
        {isSelected && !isVertical && <S.CheckIcon size={32} />}
      </S.Content>
    </S.Container>
  );
};

export default React.memo(Card);
