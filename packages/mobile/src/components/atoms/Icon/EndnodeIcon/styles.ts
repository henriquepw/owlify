import styled from 'styled-components/native';

interface ContainerProps {
  size: number;
}

interface BackgroundProps {
  color?: 'light' | 'default';
  size: number;
}

interface IconProps {
  size: number;
}

export const Container = styled.View<ContainerProps>`
  align-items: center;
  padding: 0 ${({ size }) => size * 0.09}px;
`;

export const Icon = styled.Image<IconProps>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

export const Background = styled.View<BackgroundProps>`
  position: absolute;
  top: 0;

  width: ${({ size }) => size * 1.2}px;
  height: ${({ size }) => size * 1.07}px;
  transform: scaleY(0.56) rotate(-17deg);

  opacity: 0.3;
  border-radius: ${({ size }) => (size * 1.2) / 2}px;
  background: ${({ theme, color }) =>
    color === 'light' ? theme.colours.background : theme.colours.activeLight};

  z-index: -1;
`;
