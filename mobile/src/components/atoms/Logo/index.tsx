import React from 'react';

import logoImg from '@assets/default/logo.png';
import logoLightImg from '@assets/light/logo.png';

import * as S from './styles';

interface LogoProps {
  color?: 'light' | 'default';
  background?: boolean;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ color, size = 64, background = true }) => {
  return (
    <S.Container>
      <S.Icon source={color === 'light' ? logoLightImg : logoImg} size={size} />
      {background && <S.Background color={color} size={size} />}
    </S.Container>
  );
};

export default Logo;
