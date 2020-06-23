import React from 'react';
import { Text } from 'react-native';

import * as S from './style';
import './buttom.stories';

const types = ['rgb(173, 173, 173)', 'rgb(108, 167, 173)', 'rgb(177, 69, 69)'];

interface Props {
  type: number;
  text: string;
  hasIcon: boolean;
}

export const Buttom: React.FC<Props> = ({ type, text, hasIcon }) => {
  let icon = null;
  let size = '10%';
  if (hasIcon) {
    icon = <S.Icon><Text>Icone aqui</Text></S.Icon>
    size = '30%';
  }
  return (
    <S.Container style={{ backgroundColor: types[type], height: size }}>
      {icon}
      <S.Content>{text}</S.Content>
    </S.Container>
  );
};
