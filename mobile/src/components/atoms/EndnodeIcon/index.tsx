import React from 'react';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import endnodeImg from '../../../assets/default/endnode.png';
import endnodeLightImg from '../../../assets/light/endnode.png';

import * as S from './styles';

interface EndnodeIconProps {
  color?: 'light' | 'default';
  background?: boolean;
}

const EndnodeIcon: React.FC<EndnodeIconProps> = ({
  background = true,
  color,
}) => {
  return (
    <S.Container>
      {background && <S.Background color={Colors} />}
      <S.Icon source={color === 'light' ? endnodeLightImg : endnodeImg} />
    </S.Container>
  );
};

export default EndnodeIcon;
