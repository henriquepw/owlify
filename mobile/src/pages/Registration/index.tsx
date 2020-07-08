import React from 'react';

import Button from '@atoms/Button';

import * as S from './styles';

const Registration: React.FC = () => {
  return (
    <S.Container>
      <Button icon="gateway" text="gateway" />
      <S.DividerContainer>
        <S.Divider />
        <S.DividerText>or</S.DividerText>
        <S.Divider />
      </S.DividerContainer>
      <Button icon="endnode" text="end-node" />
    </S.Container>
  );
};

export default Registration;
