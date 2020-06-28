import React from 'react';

import endnodeImg from '@assets/default/endnode.png';
import endnodeLightImg from '@assets/light/endnode.png';

import * as S from './styles';

interface EndnodeIconProps {
  color?: 'light' | 'default';
  background?: boolean;
  iconSize?: number;
}

const EndnodeIcon: React.FC<EndnodeIconProps> = ({
  color,
  iconSize = 64,
  background = true,
}) => {
  return (
    <S.Container size={iconSize}>
      <S.Icon
        source={color === 'light' ? endnodeLightImg : endnodeImg}
        size={iconSize}
      />
      {background && <S.Background color={color} size={iconSize} />}
    </S.Container>
  );
};

export default EndnodeIcon;
