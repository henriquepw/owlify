import React from 'react';

import gatewayImg from '@assets/default/gateway.png';
import gatewayLightImg from '@assets/light/gateway.png';

import * as S from './styles';

interface GatewayIconProps {
  color?: 'light' | 'default';
  background?: boolean;
  size?: number;
}

const GatewayIcon: React.FC<GatewayIconProps> = ({
  color,
  size = 64,
  background = true,
}) => {
  return (
    <S.Container size={size}>
      <S.Icon
        source={color === 'light' ? gatewayLightImg : gatewayImg}
        size={size}
      />
      {background && <S.Background color={color} size={size} />}
    </S.Container>
  );
};

export default GatewayIcon;
