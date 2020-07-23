import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import Icon, { IconProps } from '@atoms/Icon';

import * as S from './styles';

export interface ButtonProps extends RectButtonProperties {
  text: string;
  icon?: string;
  iconProps?: Omit<IconProps, 'name'>;
  type?: 'default' | 'attention' | 'disabled';
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  iconProps,
  enabled = true,
  type = 'default',
  ...rest
}) => {
  return (
    <S.Container
      optionsButtom={type}
      hasIcon={!!icon}
      enabled={enabled}
      {...rest} // passing all props from RectButton
    >
      {icon && <Icon name={icon} color="light" {...iconProps} />}
      <S.Content hasIcon={!!icon}>{text}</S.Content>
    </S.Container>
  );
};

export default Button;
