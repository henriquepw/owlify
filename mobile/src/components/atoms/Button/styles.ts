import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface ContainerProps {
  optionsButtom: 'default' | 'disabled' | 'attention';
  hasIcon: boolean;
}

interface ContentProps {
  hasIcon?: boolean;
}

export const Container = styled(RectButton)<ContainerProps>`
  background-color: ${({ theme, enabled, optionsButtom }) => {
    if (!enabled) return theme.colours.withoutFocus;
    if (optionsButtom === 'attention') return theme.colours.attention;

    return theme.colours.active;
  }};

  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${({ hasIcon }) => (hasIcon ? '158px' : '48px')};
  border-radius: 10px;
`;

export const Content = styled.Text<ContentProps>`
  text-transform: uppercase;
  letter-spacing: ${({ hasIcon }) => (hasIcon ? 1.8 : 1.6)}px;

  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ hasIcon }) => (hasIcon ? 18 : 16)}px;

  margin-top: ${({ hasIcon }) => (hasIcon ? '24px' : 0)};
  color: ${({ theme }) => theme.colours.background};
`;
