import React from 'react';

import * as S from './style';
import './buttom.stories';

const types = [
  {
    color: 'rgb(173, 173, 173)',
    text: 'isDesabled',
  },
  {
    color: 'rgb(108, 167, 173)',
    text: 'isDefault',
  },
  {
    color: 'rgb(177, 69, 69)',
    text: 'isAttention',
  },
];

interface Props {
  type: number;
}

export const Buttom: React.FC<Props> = ({ type }) => {
  return (
    <S.Container style={{ backgroundColor: `${types[type].color}` }}>
      <S.Content>{types[type].text}</S.Content>
    </S.Container>
  );
};
