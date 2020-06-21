import React from 'react';

import logoImg from '../../../assets/default/logo.png';
import logoLightImg from '../../../assets/light/logo.png';

import * as S from './styles';

interface LogoProps {
  color?: 'light' | 'default';
  background?: boolean;
  iconSize?: number;
}

const Logo: React.FC<LogoProps> = ({
  color,
  iconSize = 64,
  background = true,
}) => {
  return (
    <S.Container>
      <S.Icon
        source={color === 'light' ? logoLightImg : logoImg}
        size={iconSize}
      />
      {background && <S.Background color={color} size={iconSize} />}
    </S.Container>
  );
};

export default Logo;
