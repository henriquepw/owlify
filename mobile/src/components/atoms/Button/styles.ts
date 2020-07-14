import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface ContainerProps {
  optionsButtom: 'default' | 'disabled' | 'attention';
  hasIcon: boolean;
}

interface ContentProps {
  hasIcon?: boolean;
}

export const Container = styled(RectButton) <ContainerProps>`
  background-color: ${({ theme, enabled, optionsButtom }) => {
    if (!enabled) return theme.colors.withoutFocus;
    if (optionsButtom === 'attention') return theme.colors.attention;

    return theme.colors.active;
  }};

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: ${({ hasIcon }) => (hasIcon ? '158px' : '48px')};
  border-radius: 10px;
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const Content = styled.Text<ContentProps>`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ hasIcon }) => (hasIcon ? '18px' : '16px')};
  margin-top: ${({ hasIcon }) => (hasIcon ? '24px' : '0')};
  color: ${({ theme }) => theme.colors.background};
`;
