import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
/* import { Text } from 'react-native'; */

import * as S from './styles';

interface ButtonProps {
  type: string;
  text: string;
  hasIcon?: boolean;
  nameIcon?: string;
}

const Button: React.FC<ButtonProps> = ({
  type,
  text,
  hasIcon = false,
  nameIcon = 'main',
}) => {
  return (
    <S.Container optionsButtom={type} hasIcon={hasIcon}>
      {hasIcon && (
        <S.IconContainer>
          <Icon name={nameIcon} />
        </S.IconContainer>
      )}
      <S.Content>{text}</S.Content>
    </S.Container>
  );
};

export default Button;
