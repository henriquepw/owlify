import React from 'react';

import * as S from './styles';

interface HeaderProps {
  text?: string;
  iconName?: string;
}

const Header: React.FC<HeaderProps> = ({ text = 'Profile' }) => {
  return (
    <S.Container>
      <S.Content>
        <S.HeaderTitle>{text}</S.HeaderTitle>
      </S.Content>
    </S.Container>
  );
};

export default Header;
