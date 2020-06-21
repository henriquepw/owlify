import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import gatewayImg from '../../../assets/default/gateway.png';
import gatewayLightImg from '../../../assets/light/gateway.png';

import * as S from './styles';

interface GatewayIconProps {
  color?: 'light' | 'default';
  background?: boolean;
}

const GatewayIcon: React.FC<GatewayIconProps> = ({
  background = true,
  color,
}) => {
  return (
    <S.Container>
      {background && <S.Background color={Colors} />}
      <S.Icon source={color === 'light' ? gatewayLightImg : gatewayImg} />
    </S.Container>
  );
};

export default GatewayIcon;
