import React from 'react';
import { ViewProps } from 'react-native';

import * as S from './styles';

interface HeaderProps extends ViewProps {
  isElevated?: boolean;
}

const Header: React.FC<HeaderProps> = ({ children, isElevated, ...rest }) => {
  return (
    <S.Container isElevated={isElevated} {...rest}>
      <S.Title>{children}</S.Title>
    </S.Container>
  );
};

export default Header;
