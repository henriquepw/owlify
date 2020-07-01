import React from 'react';

import gatewayImg from '@assets/default/gateway.png';
import gatewayLightImg from '@assets/light/gateway.png';

import * as S from './styles';

interface GatewayIconProps {
  theme?: 'light' | 'default';
  background?: boolean;
  size?: number;
}

const GatewayIcon: React.FC<GatewayIconProps> = ({
  theme,
  size = 64,
  background = true,
}) => {
  return (
    <S.Container size={size}>
      <S.Icon
        source={theme === 'light' ? gatewayLightImg : gatewayImg}
        size={size}
      />
      {background && <S.Background color={theme} size={size} />}
    </S.Container>
  );
};

export default GatewayIcon;
