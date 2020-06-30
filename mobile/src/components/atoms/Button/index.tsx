import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
/* import { Text } from 'react-native'; */

import * as S from './styles';

interface propsButton {
  type: string;
  text: string;
  hasIcon?: boolean;
}

const Button: React.FC<propsButton> = ({ type, text, hasIcon = false }) => {
  return (
    <S.Container optionsButtom={type} hasIcon={hasIcon}>
      {hasIcon ? (
        <S.Icon>
          <Icon name="shake" />
        </S.Icon>
      ) : null}
      <S.Content>{text}</S.Content>
    </S.Container>
  );
};

export default Button;
