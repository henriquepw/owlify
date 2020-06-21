import styled from 'styled-components/native';

interface IconProps {
  size: number;
}

interface BackgroundProps {
  color?: 'light' | 'default';
  size: number;
}

export const Container = styled.View`
  margin: 1px;
`;

export const Icon = styled.Image<IconProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

export const Background = styled.View<BackgroundProps>`
  width: ${({ size }) => size * 0.96}px;
  height: ${({ size }) => size * 0.96}px;

  margin-left: ${({ size }) => size * 0.1}px;
  margin-top: -${({ size }) => size * 0.88}px;

  opacity: 0.3;
  border-radius: ${({ size }) => size / 2}px;
  background: ${({ theme, color }) =>
    color === 'light' ? theme.colors.background : theme.colors.activeLight};

  z-index: -1;
`;
