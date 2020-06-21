import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import logoImg from '../../../assets/default/logo.png';
import logoLightImg from '../../../assets/light/logo.png';

import * as S from './styles';

interface LogoProps {
  color?: 'light' | 'default';
  background?: boolean;
}

const Logo: React.FC<LogoProps> = ({ background = true, color }) => {
  return (
    <S.Container>
      {background && <S.Background color={Colors} />}
      <S.Icon source={color === 'light' ? logoLightImg : logoImg} />
    </S.Container>
  );
};

export default Logo;
