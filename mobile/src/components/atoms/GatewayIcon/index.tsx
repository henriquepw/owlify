import React from 'react';

import gatewayImg from '@assets/default/gateway.png';
import gatewayLightImg from '@assets/light/gateway.png';

import * as S from './styles';

interface GatewayIconProps {
  color?: 'light' | 'default';
  background?: boolean;
  iconSize?: number;
}

const GatewayIcon: React.FC<GatewayIconProps> = ({
  color,
  iconSize = 64,
  background = true,
}) => {
  return (
    <S.Container size={iconSize}>
      <S.Icon
        source={color === 'light' ? gatewayLightImg : gatewayImg}
        size={iconSize}
      />
      {background && <S.Background color={color} size={iconSize} />}
    </S.Container>
  );
};

export default GatewayIcon;
