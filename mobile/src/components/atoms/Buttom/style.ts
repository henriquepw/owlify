import styled from 'styled-components/native';

import { light } from '../../../styles/themes';

const colorsOptions = [
  light.colors.active,
  light.colors.secondaryText,
  light.colors.attention,
  light.colors.background,
];

interface Props {
  optionsButtom: number;
  hasIcon?: boolean;
}

export const Container = styled.View<Props>`
  background-color: ${(color) => colorsOptions[color.optionsButtom]};
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
