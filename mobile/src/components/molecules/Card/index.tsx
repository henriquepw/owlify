import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import Icon, { IconProps } from '@atoms/Icon';

import * as S from './styles';

interface CardProps extends TouchableOpacityProps {
  title: string;
  subTitle: string;
  isSelected?: boolean;
  isVertical?: boolean;
  iconName?: string;
  iconProps?: IconProps;
}

const Card: React.FC<CardProps> = ({
  isVertical,
  isSelected,
  iconName,
  iconProps,
  title,
  subTitle,
  disabled,
  ...rest
}) => {
  return (
    <S.Container
      activeOpacity={0.6}
      isVertical={isVertical}
      disabled={!!disabled}
      {...rest}
    >
      <S.Content isVertical={isVertical} isSelected={isSelected}>
        {iconName && <Icon name={iconName} {...iconProps} />}

        <S.TextWrapper isCentered={isVertical}>
          <S.Title isVertical={isVertical}>{title}</S.Title>
          <S.SubTitle isVertical={isVertical}>{subTitle}</S.SubTitle>
        </S.TextWrapper>

        {isSelected && !isVertical && <S.CheckIcon size={32} />}
      </S.Content>
    </S.Container>
  );
};

export default React.memo(Card);
