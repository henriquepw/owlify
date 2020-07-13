import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isElevated?: boolean;
}

export const Container = styled.View<ContainerProps>`
  background: ${({ theme }) => theme.colours.background};
  flex-direction: column;

  width: 100%;
  padding: 24px;

  ${({ isElevated }) =>
    isElevated &&
    css`
      elevation: 2;
      shadow-color: #000;
      shadow-opacity: 0.1;
      shadow-offset: 2px 2px;
    `}
`;

export const Title = styled.Text`
  font-size: 20px;
  font-family: ${({ theme }) => theme.fonts.bold};
  letter-spacing: 2px;
  text-align: left;

  color: ${({ theme }) => theme.colours.active};
`;
