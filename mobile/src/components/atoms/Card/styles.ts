import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isVertical?: boolean;
}

interface ContentProps {
  isCentered?: boolean;
}

export const Container = styled(RectButton)<ContainerProps>`
  ${({ isVertical }) =>
    !isVertical &&
    css`
      flex-direction: row;
      width: 100%;
    `}

  align-items: center;

  padding: 16px;
  border-radius: 10px;
  background: ${({ theme }) => theme.colors.card};

  elevation: 3;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 2px 2px;
`;

export const Content = styled.View<ContentProps>`
  align-items: ${(props) => (props.isCentered ? 'center' : 'flex-start')};

  margin: ${(props) => (props.isCentered ? '16px 0 0' : '0 0 0 16px')};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 18px;

  color: ${({ theme }) => theme.colors.active};
`;

export const SubTitle = styled.Text`
  margin-top: 8px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 14px;

  color: ${({ theme }) => theme.colors.active};
  opacity: 0.7;
`;
