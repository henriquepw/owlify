import React from 'react';

import endnodeImg from '@assets/default/endnode.png';
import endnodeLightImg from '@assets/light/endnode.png';

import * as S from './styles';

interface EndnodeIconProps {
  theme?: 'light' | 'default';
  background?: boolean;
  size?: number;
}

const EndnodeIcon: React.FC<EndnodeIconProps> = ({
  theme,
  size = 64,
  background = true,
}) => {
  return (
    <S.Container size={size}>
      <S.Icon
        source={theme === 'light' ? endnodeLightImg : endnodeImg}
        size={size}
      />
      {background && <S.Background color={theme} size={size} />}
    </S.Container>
  );
};

export default EndnodeIcon;
