import React from 'react';
import { TextProps } from 'react-native';
import VectorIcon from 'react-native-vector-icons/Feather';
import { useTheme } from 'styled-components';

import EndnodeIcon from './EndnodeIcon';
import GatewayIcon from './GatewayIcon';

export interface IconProps extends TextProps {
  name: string;
  color?: string;
  size?: number;
  background?: boolean; // this props  has effect only on my icons
}

const MyIcons = {
  endnode: EndnodeIcon,
  gateway: GatewayIcon,
};

const Icon: React.FC<IconProps> = ({
  name,
  color,
  background = true,
  size = 64,
  ...rest
}) => {
  const { colours } = useTheme();

  const CurrentIcon = MyIcons[name] || VectorIcon;

  return (
    <CurrentIcon
      name={name}
      size={size}
      background={background}
      theme={color === 'light' ? 'light' : 'default'}
      color={color === 'light' ? colours.background : colours.activeLight}
      {...rest}
    />
  );
};

export default Icon;
