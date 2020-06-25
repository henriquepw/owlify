import React from 'react';
import { Text } from 'react-native';

import * as S from './style';

interface Props {
  type: number;
  text: string;
  hasIcon: boolean;
}

export const Buttom: React.FC<Props> = ({ type, text, hasIcon }) => {
  return (
    <S.Container optionsButtom={type} hasIcon={hasIcon}>
      {hasIcon ? (
        <S.Icon>
          <Text>Icone aqui</Text>
        </S.Icon>
      ) : null}
      <S.Content>{text}</S.Content>
    </S.Container>
  );
};
