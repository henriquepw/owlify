import React from 'react';
import { TextProps } from 'react-native';
import VectorIcon from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components';

import EndnodeIcon from '@atoms/EndnodeIcon';
import GatewayIcon from '@atoms/GatewayIcon';
import Logo from '@atoms/Logo';

export interface IconProps extends TextProps {
  name: string;
  color?: string;
  size?: number;
  background?: boolean; // this props  has effect only on atom icons
}

const AtomIcons = {
  endnode: EndnodeIcon,
  gateway: GatewayIcon,
  logo: Logo,
};

const Icon: React.FC<IconProps> = ({
  name,
  color,
  background = true,
  size = 64,
  ...rest
}) => {
  const theme = useTheme();

  const CurrentIcon = AtomIcons[name] || VectorIcon;

  return (
    <CurrentIcon
      name={name}
      color={color || theme.colors.active}
      background={background}
      size={size}
      {...rest}
    />
  );
};

export default Icon;
