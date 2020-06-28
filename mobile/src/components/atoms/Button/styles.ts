import styled from 'styled-components/native';

import { light } from '../../../styles/themes';

interface propsStyledButton {
  optionsButtom: string;
  hasIcon?: boolean;
}

export const Container = styled.View<propsStyledButton>`
  background-color: ${({ theme, optionsButtom }) => {
    if (optionsButtom === 'isFocused') return theme.colors.background;
    if (optionsButtom === 'isErrored') return theme.colors.attention;
    if (optionsButtom === 'isFilled') return theme.colors.active;

    return theme.colors.withoutFocus;
  }};
  display: flex;
  width: 80%;
  height: ${(has) => (has.hasIcon ? '30%' : '10%')};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const Content = styled.Text`
  color: ${light.colors.background};
  font-size: 16px;
`;

export const Icon = styled.View`
  margin: 20px;
`;
